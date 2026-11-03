import re, sys
p = sys.argv[1]
s = open(p).read()
M = {'K': 'R', 'Q': 'D', 'R': 'T', 'B': 'A', 'N': 'C'}

def conv(m):
    t = m.group(2)
    t = re.sub(r'(?<![A-Za-z=])([KQRBN])', lambda x: M[x.group(1)], t)
    t = re.sub(r'=([QRBN])', lambda x: '=' + M[x.group(1)], t)
    return m.group(1) + t + '"'

s = re.sub(r'("es": ")(\d+\.[^"]*)"', conv, s)
open(p, 'w').write(s)
