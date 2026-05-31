#!/usr/bin/env bash
# Boots the landing page + all test sites, each on its own fixed port.
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

# Sites table: dir|name|port
SITES=(
  "ecommerce|Nimbus Store|5001"
  "careers|Northwind Careers|5002"
  "banking|Meridian Bank|5003"
  "crm|Pipeline CRM|5004"
  "admin|Console Admin|5005"
  "travel|Voyage Travel|5006"
  "tickets|Showtime Tickets|5007"
  "insurance|Assure Insurance|5008"
  "hospital|Pulse Hospital|5009"
  "realestate|Hearth Homes|5010"
  "food|Munch|5011"
  "social|Buzz|5012"
)

# Emit landing/status.json with start time, commit, and per-site info.
write_status() {
  local started commit out tmp
  started="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  commit="$(git -C "$ROOT" rev-parse --short HEAD 2>/dev/null || echo unknown)"
  out="$ROOT/landing/status.json"
  tmp="$out.tmp"
  {
    printf '{\n'
    printf '  "startedAt": "%s",\n' "$started"
    printf '  "commit": "%s",\n' "$commit"
    printf '  "sites": [\n'
    local first=1
    for entry in "${SITES[@]}"; do
      IFS='|' read -r dir name port <<< "$entry"
      local built="false" builtAt="null"
      if [ -f "$ROOT/$dir/dist/index.html" ]; then
        built="true"
        builtAt="\"$(date -u -r "$ROOT/$dir/dist/index.html" +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || echo unknown)\""
      fi
      [ $first -eq 1 ] && first=0 || printf ',\n'
      printf '    { "name": "%s", "dir": "%s", "port": %s, "built": %s, "builtAt": %s }' \
        "$name" "$dir" "$port" "$built" "$builtAt"
    done
    printf '\n  ]\n'
    printf '}\n'
  } > "$tmp" && mv "$tmp" "$out"
}

start_site() {
  local dir="$1" name="$2" port="$3"
  if [ ! -d "$ROOT/$dir/node_modules" ]; then
    echo "Installing dependencies for $name (first run)…"
    (cd "$ROOT/$dir" && npm install >"$ROOT/logs/$dir-install.log" 2>&1)
  fi
  printf '  %-20s →  http://localhost:%s\n' "$name" "$port"
  # exec so the backgrounded PID is vite itself (clean shutdown on Ctrl+C).
  ( cd "$ROOT/$dir" && exec node_modules/.bin/vite ) >"$ROOT/logs/$dir.log" 2>&1 &
  PIDS+=($!)
}

write_status

echo "Starting Hominis test sites…"
echo ""
echo "  Landing              →  http://localhost:5000"
echo "  Status page          →  http://localhost:5000/status"
( cd "$ROOT/landing" && exec python3 -m http.server 5000 ) >"$ROOT/logs/landing.log" 2>&1 &
PIDS+=($!)

for entry in "${SITES[@]}"; do
  IFS='|' read -r dir name port <<< "$entry"
  start_site "$dir" "$name" "$port"
done

echo ""
echo "All sites are starting up (give Vite a few seconds)."
echo "Open the landing page:  http://localhost:5000"
echo "Logs are in ./logs/.  Press Ctrl+C to stop everything."
echo ""
wait
