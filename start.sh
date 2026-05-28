#!/usr/bin/env bash
# Boots the landing page + all five test sites, each on its own fixed port.
# Press Ctrl+C once to stop everything.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
mkdir -p "$ROOT/logs"
PIDS=()

cleanup() {
  echo ""
  echo "Stopping all sites…"
  for pid in "${PIDS[@]}"; do kill "$pid" 2>/dev/null || true; done
  wait 2>/dev/null || true
  echo "Done."
  exit 0
}
trap cleanup INT TERM

start_site() {
  local dir="$1" name="$2" port="$3"
  if [ ! -d "$ROOT/$dir/node_modules" ]; then
    echo "Installing dependencies for $name (first run)…"
    (cd "$ROOT/$dir" && npm install >"$ROOT/logs/$dir-install.log" 2>&1)
  fi
  echo "  $name  →  http://localhost:$port"
  # exec so the backgrounded PID is vite itself (clean shutdown on Ctrl+C).
  ( cd "$ROOT/$dir" && exec node_modules/.bin/vite ) >"$ROOT/logs/$dir.log" 2>&1 &
  PIDS+=($!)
}

echo "Starting Hominis test sites…"
echo ""
echo "  Landing  →  http://localhost:5000"
( cd "$ROOT/landing" && exec python3 -m http.server 5000 ) >"$ROOT/logs/landing.log" 2>&1 &
PIDS+=($!)

start_site ecommerce "Nimbus Store    " 5001
start_site careers   "Northwind Career" 5002
start_site banking   "Meridian Bank   " 5003
start_site crm       "Pipeline CRM    " 5004
start_site admin     "Console Admin   " 5005
start_site travel    "Voyage Travel   " 5006
start_site tickets   "Showtime Tickets" 5007
start_site insurance "Assure Insurance" 5008
start_site hospital  "Pulse Hospital  " 5009

echo ""
echo "All sites are starting up (give Vite a few seconds)."
echo "Open the landing page:  http://localhost:5000"
echo "Logs are in ./logs/.  Press Ctrl+C to stop everything."
echo ""
wait
