import re, subprocess, json, sys
pdf = sys.argv[1]
a, b = int(sys.argv[2]), int(sys.argv[3])
txt = subprocess.run(['pdftotext', '-layout', '-f', str(a), '-l', str(b), pdf, '-'], capture_output=True, text=True).stdout
head = re.compile(r'^(\d{1,4})\. ([^\n]+?), ([^,\n]*?\s?\(?[^,\n]*?\)?\s?)?(\d{4})\s*$')
rows = []
lines = txt.split('\n')
for i, l in enumerate(lines):
    m = re.match(r'^(\d{1,4})\. (.+?) [–-] (.+?),\s*(.*?)(\d{4})\s*$', l)
    if m:
        nxt = lines[i + 1] if i + 1 < len(lines) else ''
        mv = re.match(r'^\s*(\d+)(\.\.\.|\.)\s*(\S+)', nxt)
        rows.append({
            'n': int(m.group(1)), 'w': m.group(2).strip(), 'b': m.group(3).strip(),
            'where': m.group(4).strip(), 'year': int(m.group(5)),
            'key': (mv.group(1) + mv.group(2) + mv.group(3)) if mv else None,
        })
json.dump(rows, open(sys.argv[4], 'w'), ensure_ascii=False, indent=0)
print(len(rows))
