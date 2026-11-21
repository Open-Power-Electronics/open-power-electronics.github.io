#!/usr/bin/env bash
# Regenerate muted clips from the promo master. The master path is required.
# Each clip crop is W:H:X:Y on the 1920x1080 master; clips keep the cropped size.
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

if ! command -v ffprobe >/dev/null 2>&1; then
  echo "ffprobe is required" >&2
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
  local crop=$4
  local mp4="$clips_dir/$name.mp4"
  local webm="$clips_dir/$name.webm"
  local poster="$clips_dir/$name.jpg"
  local cw ch cx cy
  IFS=: read -r cw ch cx cy <<<"$crop"
  if [[ -z "$cw" || -z "$ch" || -z "$cx" || -z "$cy" ]]; then
    echo "invalid crop: $crop" >&2
    exit 1
  fi
  if (( cw % 2 != 0 || ch % 2 != 0 || cx % 2 != 0 || cy % 2 != 0 )); then
    echo "crop values must be even: $crop" >&2
    exit 1
  fi
  if (( cw <= 0 || ch <= 0 || cx < 0 || cy < 0 )); then
    echo "crop is out of range: $crop" >&2
    exit 1
  fi

  local vf="crop=${crop}"

  ffmpeg -y -hide_banner -loglevel error -i "$master" -ss "$start" -to "$end" \
    -an -vf "$vf" -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
    -movflags +faststart "$mp4"

  ffmpeg -y -hide_banner -loglevel error -i "$master" -ss "$start" -to "$end" \
    -an -vf "$vf" -c:v libvpx-vp9 -b:v 0 -crf 32 -deadline good -cpu-used 1 \
    -row-mt 1 -pix_fmt yuv420p "$webm"

  ffmpeg -y -hide_banner -loglevel error -i "$mp4" \
    -vf "select=eq(n\,0)" -frames:v 1 -q:v 2 "$poster"

  local out_w out_h webm_w webm_h
  out_w=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of default=nokey=1:noprint_wrappers=1 "$mp4")
  out_h=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of default=nokey=1:noprint_wrappers=1 "$mp4")
  webm_w=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of default=nokey=1:noprint_wrappers=1 "$webm")
  webm_h=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of default=nokey=1:noprint_wrappers=1 "$webm")
  if (( out_w % 2 != 0 || out_h % 2 != 0 || webm_w % 2 != 0 || webm_h % 2 != 0 )); then
    echo "odd output dimensions for $name: mp4 ${out_w}x${out_h} webm ${webm_w}x${webm_h}" >&2
    exit 1
  fi
  if (( out_w != webm_w || out_h != webm_h )); then
    echo "mp4/webm size mismatch for $name: ${out_w}x${out_h} vs ${webm_w}x${webm_h}" >&2
    exit 1
  fi
  if (( out_w != cw || out_h != ch )); then
    echo "expected native ${cw}x${ch} for $name, got ${out_w}x${out_h}" >&2
    exit 1
  fi
}

# intro: exploded board and grid only. Card clips share the card interior.
encode_clip intro 0.0 5.0 1050:748:820:174
encode_clip spice 36.0 44.0 1260:724:570:190
encode_clip placement 44.0 50.0 1260:724:570:190
encode_clip comment 50.0 62.0 1260:724:570:190
encode_clip case 66.0 76.0 1260:724:570:190
encode_clip thermal 84.3 88.0 1260:724:570:190
encode_clip parasitics 88.0 92.2 1260:724:570:190

cp -- "$master" "$film_dir/openpe-workflow-demo.mp4"
cmp -- "$master" "$film_dir/openpe-workflow-demo.mp4"
ffmpeg -y -hide_banner -loglevel error -ss 53 -i "$master" -frames:v 1 \
  -vf "scale=1920:-2" -q:v 2 "$film_dir/openpe-workflow-demo.jpg"

names=(
  intro
  spice
  placement
  comment
  case
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
