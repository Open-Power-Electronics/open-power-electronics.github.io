#!/usr/bin/env bash
# Regenerate muted clips from the promo master. The master path is required.
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "usage: scripts/cut-clips.sh <master-video-path>" >&2
  exit 1
fi

master=$1
if [[ ! -f "$master" ]]; then
  echo "master video not found: $master" >&2
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required" >&2
  exit 1
fi

if ! ffmpeg -hide_banner -encoders | grep -q libvpx-vp9; then
  echo "ffmpeg is missing libvpx-vp9" >&2
  exit 1
fi

if ! ffmpeg -hide_banner -encoders | grep -q libx264; then
  echo "ffmpeg is missing libx264" >&2
  exit 1
fi

root=$(cd "$(dirname "$0")/.." && pwd)
clips_dir="$root/public/media/clips"
film_dir="$root/public/media"
mkdir -p "$clips_dir"

encode_clip() {
  local name=$1
  local start=$2
  local end=$3
  local mp4="$clips_dir/$name.mp4"
  local webm="$clips_dir/$name.webm"
  local poster="$clips_dir/$name.jpg"

  ffmpeg -y -hide_banner -loglevel error -ss "$start" -to "$end" -i "$master" \
    -an -vf "scale=1280:-2" -c:v libx264 -preset veryfast -crf 23 -pix_fmt yuv420p \
    -movflags +faststart "$mp4"

  ffmpeg -y -hide_banner -loglevel error -ss "$start" -to "$end" -i "$master" \
    -an -vf "scale=1280:-2" -c:v libvpx-vp9 -b:v 0 -crf 34 -deadline good -cpu-used 4 \
    -row-mt 1 -pix_fmt yuv420p "$webm"

  ffmpeg -y -hide_banner -loglevel error -i "$mp4" -frames:v 1 -q:v 2 "$poster"
}

encode_clip intro 0.0 5.0
encode_clip architecture 6.5 12.5
encode_clip agents 12.0 16.0
encode_clip workspace 16.5 24.0
encode_clip spice 36.0 44.0
encode_clip placement 44.0 50.0
encode_clip comment 50.0 62.0
encode_clip case 66.0 76.0
encode_clip plugins 80.0 84.2
encode_clip thermal 84.3 88.0
encode_clip parasitics 88.0 92.2

cp -- "$master" "$film_dir/openpe-workflow-demo.mp4"
cmp -- "$master" "$film_dir/openpe-workflow-demo.mp4"
ffmpeg -y -hide_banner -loglevel error -ss 1 -i "$master" -frames:v 1 \
  -vf "scale=1280:-2" -q:v 2 "$film_dir/openpe-workflow-demo.jpg"

names=(
  intro
  architecture
  agents
  workspace
  spice
  placement
  comment
  case
  plugins
  thermal
  parasitics
)

for name in "${names[@]}"; do
  for ext in webm mp4 jpg; do
    file="$clips_dir/$name.$ext"
    if [[ ! -s "$file" ]]; then
      echo "missing or empty output: $file" >&2
      exit 1
    fi
  done
done

if [[ ! -s "$film_dir/openpe-workflow-demo.mp4" ]]; then
  echo "missing or empty film copy" >&2
  exit 1
fi

if [[ ! -s "$film_dir/openpe-workflow-demo.jpg" ]]; then
  echo "missing or empty film poster" >&2
  exit 1
fi
