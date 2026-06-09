#!/bin/bash
cd "$(dirname "$0")"

echo ""
echo "  Finderz Keeperz Scout Engine"
echo "  ──────────────────────────"
echo ""

echo "→ Oude servers stoppen..."
for PORT in 3000 3001 3002 3333 4444 5555 8080; do
  PID=$(lsof -ti :$PORT 2>/dev/null)
  if [ -n "$PID" ]; then
    kill -9 $PID 2>/dev/null || true
    echo "  Poort $PORT gestopt"
  fi
done
sleep 1

echo "→ Project bouwen..."
rm -rf .next
npm run build || { echo "✗ Build mislukt"; exit 1; }

echo ""
echo "✓ Klaar! Open dit in Chrome of Safari:"
echo ""
echo "   http://localhost:3000"
echo ""
echo "  Stoppen met Ctrl+C"
echo ""

npm run start
