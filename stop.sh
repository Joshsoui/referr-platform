#!/bin/bash
echo "→ Servers stoppen..."
for PORT in 3000 3001 3002; do
  PID=$(lsof -ti :$PORT 2>/dev/null)
  if [ -n "$PID" ]; then
    kill -9 $PID 2>/dev/null
    echo "  Poort $PORT gestopt"
  else
    echo "  Poort $PORT was al vrij"
  fi
done
echo "✓ Klaar"
