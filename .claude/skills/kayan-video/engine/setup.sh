#!/usr/bin/env bash
# Prepare a work directory for one video.   setup.sh <workdir> [example-name]
# - installs the site's 3D library (three r128) locally, because cdnjs may be blocked in cloud sessions
# - checks the tools the engine needs
# - optionally copies an example storyboard (examples/<name>/) as a starting point
set -euo pipefail
W="${1:?usage: setup.sh <workdir> [example]}"; EX="${2:-}"
HERE="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "$W/site" "$W/out"
if [ ! -f "$W/node_modules/three/build/three.min.js" ]; then
  (cd "$W" && [ -f package.json ] || echo '{"private":true}' > package.json; cd "$W" && npm i --no-audit --no-fund --silent three@0.128.0)
fi
if [ -n "$EX" ]; then
  [ -f "$W/storyboard.json" ] && { echo "storyboard.json already exists in $W, not overwriting"; } || cp "$HERE/../examples/$EX/storyboard.json" "$W/"
  for f in "$HERE/../examples/$EX/"*; do case "$f" in *storyboard.json|*README*) ;; *) cp --update=none "$f" "$W/";; esac; done
fi
node -e "require('playwright')" || { echo "playwright missing"; exit 1; }
command -v ffmpeg >/dev/null || { echo "ffmpeg missing"; exit 1; }
python3 -c "import numpy, PIL" || { echo "python numpy/Pillow missing"; exit 1; }
echo "ready: $W"
