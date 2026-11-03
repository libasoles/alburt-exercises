"""Build pick-all.json / ident-all.json for gen.mjs.

Keeps every exercise already in src/woodpecker/data.js (same order, so ids and
links stay stable) and appends N new ones per level, chosen evenly (by book
number) among the matched games not used yet.

usage: python3 -I pick.py <tmp-dir> <path/to/src/woodpecker/data.js> <new-per-level>
needs in <tmp-dir>: matched-easy.json matched-inter.json matched-adv.json
                    easy.json inter.json adv.json
"""
import json, os, re, sys

tmp, data_js, n_new = sys.argv[1], sys.argv[2], int(sys.argv[3])
LEVELS = (('easy', 'matched-easy.json'), ('intermediate', 'matched-inter.json'), ('advanced', 'matched-adv.json'))

matched = {}
for level, f in LEVELS:
    for m in json.load(open(os.path.join(tmp, f))):
        m['level'] = level
        matched[m['n']] = m

text = open(data_js).read()
existing = [int(x) for x in re.findall(r'"bookNumber": (\d+)', text)]
picks = [matched[n] for n in existing]  # raises KeyError if a match file is stale
used = set(existing)

for level, _ in LEVELS:
    pool = sorted((m for m in matched.values() if m['level'] == level and m['n'] not in used), key=lambda m: m['n'])
    if not n_new or not pool:
        continue
    step = len(pool) / n_new
    picks += [pool[int(i * step)] for i in range(min(n_new, len(pool)))]

json.dump(picks, open(os.path.join(tmp, 'pick-all.json'), 'w'), ensure_ascii=False)
ident = {}
for f in ('easy', 'inter', 'adv'):
    for e in json.load(open(os.path.join(tmp, f + '.json'))):
        ident[e['n']] = e
json.dump(ident, open(os.path.join(tmp, 'ident-all.json'), 'w'), ensure_ascii=False)
print(len(picks), 'picks')
