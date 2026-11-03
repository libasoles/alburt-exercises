#!/bin/bash
# Downloads PGN Mentor player archives, each into its own empty directory.
BASE="$1"
shift
for p in "$@"; do
  mkdir -p "$BASE/$p"
  code=$(curl -s -o "$BASE/$p/$p.zip" -w "%{http_code}" "https://www.pgnmentor.com/players/$p.zip")
  if [ "$code" = 200 ]; then
    unzip -q -o "$BASE/$p/$p.zip" -d "$BASE/$p"
    echo "$p ok"
  else
    echo "$p $code"
    rm -rf "$BASE/$p"
  fi
done
