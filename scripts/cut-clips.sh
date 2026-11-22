#!/usr/bin/env bash
# Regenerate the web film derivative, muted clips and posters from the promo master.
# Current release: OpenPE.mp4, as recorded in OpenPE promotion/VERIFY.md.
# SHA-256: e3b59d67283c9a5e83861e7de6bce0e9ebdde29cdf0d2dfd1c64384a871be69a
# Each clip crop is W:H:X:Y on the 1920x1080 master. Use 16px-aligned output dimensions to avoid partially visible decoder padding.
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

encoders=$(ffmpeg -hide_banner -encoders)
for encoder in libx264 libvpx-vp9 libwebp; do
  if [[ "$encoders" != *"$encoder"* ]]; then
    echo "ffmpeg is missing $encoder" >&2
    exit 1
  fi
done

video_dimensions() {
  local size
  size=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$1")
  printf '%s\n' "${size%$'\r'}"
}

master_size=$(video_dimensions "$master")
if [[ "$master_size" != "1920,1080" ]]; then
  echo "expected a 1920x1080 promotional master, got $master_size" >&2
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
  local poster_time=$5
  local mp4="$clips_dir/$name.mp4"
  local webm="$clips_dir/$name.webm"
  local poster="$clips_dir/$name.jpg"
  local cw ch cx cy
  IFS=: read -r cw ch cx cy <<<"$crop"
  if [[ -z "$cw" || -z "$ch" || -z "$cx" || -z "$cy" ]]; then
    echo "invalid crop: $crop" >&2
    exit 1
  fi
  if (( cw % 16 != 0 || ch % 16 != 0 || cx % 2 != 0 || cy % 2 != 0 )); then
    echo "clip dimensions must be multiples of 16 and crop offsets must be even: $crop" >&2
    exit 1
  fi
  if (( cw <= 0 || ch <= 0 || cx < 0 || cy < 0 || cx + cw > 1920 || cy + ch > 1080 )); then
    echo "crop is out of range: $crop" >&2
    exit 1
  fi

  local vf="crop=${crop}"

  ffmpeg -y -nostdin -hide_banner -loglevel error -i "$master" -ss "$start" -to "$end" \
    -an -vf "$vf" -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
    -movflags +faststart "$mp4"

  ffmpeg -y -nostdin -hide_banner -loglevel error -i "$master" -ss "$start" -to "$end" \
    -an -vf "$vf" -c:v libvpx-vp9 -b:v 0 -crf 32 -deadline good -cpu-used 3 \
    -row-mt 1 -pix_fmt yuv420p "$webm"

  ffmpeg -y -nostdin -hide_banner -loglevel error -ss "$poster_time" -i "$master" \
    -vf "$vf" -frames:v 1 -q:v 2 -update 1 "$poster"

  local file dimensions
  for file in "$mp4" "$webm" "$poster"; do
    dimensions=$(video_dimensions "$file")
    if [[ "$dimensions" != "$cw,$ch" ]]; then
      echo "expected ${cw}x${ch} for $file, got $dimensions" >&2
      exit 1
    fi
  done
}

# Keep the editors and analysis panels inside the film's card interior.
# Use settled posters. In particular, 88.0 s is still the thermal shot.
encode_clip spice 35.6 43.9 1360:768:520:168 43.4
encode_clip layout 44.7 64.8 1360:768:520:168 64.4
encode_clip case 65.8 79.9 1360:768:520:168 78.8
encode_clip thermal 84.666667 87.9 1264:720:568:192 87.4
parasitics_still=91.5
encode_clip parasitics 88.7 91.9 1264:720:568:192 "$parasitics_still"

# Preserve the original soundtrack and 98 s timeline in a smaller, seekable web encode.
ffmpeg -y -nostdin -hide_banner -loglevel error -i "$master" -map 0:v:0 -map 0:a:0 \
  -c:v libx264 -preset medium -crf 22 -pix_fmt yuv420p -c:a copy \
  -movflags +faststart "$film_dir/openpe-workflow-demo.mp4"
ffmpeg -y -nostdin -hide_banner -loglevel error -ss 4.8 -i "$master" -frames:v 1 \
  -vf "crop=1056:752:816:172" -q:v 2 -update 1 "$film_dir/openpe-workflow-demo.jpg"
ffmpeg -y -nostdin -hide_banner -loglevel error -ss "$parasitics_still" -i "$master" -frames:v 1 \
  -vf "crop=1212:638:594:224" -c:v libwebp -quality 91 -compression_level 6 \
  "$film_dir/layout-parasitics.webp"

names=(
  spice
  layout
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

for asset in openpe-workflow-demo.mp4 openpe-workflow-demo.jpg layout-parasitics.webp; do
  if [[ ! -s "$film_dir/$asset" ]]; then
    echo "missing or empty output: $asset" >&2
    exit 1
  fi
done
