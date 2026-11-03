import json, os, sys, unicodedata
from collections import Counter

tmp = sys.argv[1]
c = Counter()
for f in ('inter', 'adv'):
    for x in json.load(open(os.path.join(tmp, f + '.json'))):
        for k in ('w', 'b'):
            c[x[k]] += 1
have = set(os.listdir(os.path.join(tmp, 'pgn')))
out = []
for n, k in c.most_common():
    if k < 2 or n == 'N.N.':
        continue
    s = unicodedata.normalize('NFD', n.replace('’', '').split()[-1]).encode('ascii', 'ignore').decode()
    if s not in have and s not in out:
        out.append(s)
open(os.path.join(tmp, 'names.txt'), 'w').write(' '.join(out))
print(len(out))
