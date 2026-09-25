# Renders screenshots/today-attention.png from synthetic data (no real people, messages or events).
# Usage: pip install cairosvg && python3 diagrams/render-today.py
import random
import cairosvg

W, H = 1440, 900
BG, PANEL, PANEL2, BORDER = '#050b18', '#0b1628', '#0f1d33', '#1d3150'
TP, TS, TM, CY = '#eaf4ff', '#9fb4cf', '#6a809f', '#38bdf8'
PC = {'P0': '#f87171', 'P1': '#f59e0b', 'P2': '#38bdf8', 'P3': '#64748b'}
o = []


def t(x, y, s, sz=13, c=TP, w=400, a='start', mono=False):
    s = str(s).replace('&', '&amp;').replace('<', '&lt;')
    f = 'DejaVu Sans Mono, Menlo, monospace' if mono else 'Inter, DejaVu Sans, Helvetica, Arial, sans-serif'
    o.append(f'<text x="{x}" y="{y}" font-size="{sz}" fill="{c}" font-weight="{w}" text-anchor="{a}" font-family="{f}">{s}</text>')


def r(x, y, w, h, f=PANEL, st=BORDER, rx=12):
    o.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{f}" stroke="{st}"/>')


def chip(x, y, label, c):
    w = len(label) * 7.6 + 26
    o.append(f'<rect x="{x}" y="{y}" width="{w}" height="22" rx="11" fill="{c}" fill-opacity=".14" stroke="{c}" stroke-opacity=".55"/>'
             f'<circle cx="{x + 11}" cy="{y + 11}" r="3.5" fill="{c}"/>')
    t(x + 20, y + 15, label, 11, c, 600, mono=True)
    return w


o.append(f'<rect width="{W}" height="{H}" fill="{BG}"/>')
random.seed(7)
for _ in range(260):
    o.append(f'<circle cx="{random.uniform(0, W):.0f}" cy="{random.uniform(0, H):.0f}" r="{random.choice([.6, .8, 1, 1.3])}" '
             f'fill="#cfe7ff" opacity="{random.uniform(.15, .6):.2f}"/>')
o.append(f'<circle cx="1260" cy="130" r="120" fill="{CY}" opacity=".06"/><circle cx="1260" cy="130" r="40" fill="{CY}" opacity=".18"/>'
         f'<circle cx="1260" cy="130" r="18" fill="#e0f2fe"/>')

t(64, 70, 'TODAY · THU 14 MAR', 12, CY, 700, mono=True)
t(64, 112, 'What needs your attention today', 34, TP, 700)
t(64, 142, '4 items from 6 sources · relationship context degraded (3 days old)', 14, TS)
x = 64
for lab, c in [('CALENDAR', '#34d399'), ('GMAIL', '#34d399'), ('TASKS', '#34d399'), ('PROJECTS', '#34d399'),
               ('RELATIONSHIPS', '#f59e0b'), ('MEMORY', '#34d399')]:
    x += chip(x, 160, lab, c) + 8

# Priority queue
r(64, 206, 840, 640)
t(88, 240, 'PRIORITY QUEUE', 12, TM, 700, mono=True)
t(880, 240, 'evidence-backed · capped', 12, TM, 400, 'end')
items = [
    ('P1', 'Resolve 11:00 calendar conflict', 'Weekly 1:1 overlaps Harbor Labs kickoff · 2 calendar events',
     'Proposed: move 1:1 to 14:00 · approval required', True),
    ('P1', 'Reply to Studio Kestrel on the revised proposal', 'Waiting 2 days · explicit reply requested · 1 email thread',
     'Draft prepared by VECTOR · approval required to send', False),
    ('P2', "Prepare notes for Thursday's Harbor Labs review", 'Meeting in 2 days · 3 project documents referenced',
     'Research by VOYAGER in progress', False),
    ('P3', 'Lumen project milestone drifting by two days', 'Milestone date vs. open tasks · confidence medium',
     'Informational · no action proposed', False),
]
for i, (p, title, why, act, sel) in enumerate(items):
    y = 262 + i * 140
    r(84, y, 800, 124, PANEL2, CY if sel else BORDER, 10)
    o.append(f'<rect x="84" y="{y}" width="5" height="124" rx="2" fill="{PC[p]}"/>')
    chip(104, y + 18, p, PC[p])
    t(160, y + 34, title, 17, TP, 600)
    t(104, y + 66, why, 13, TS)
    t(104, y + 94, '→ ' + act, 13, CY if 'approval' in act else TM, 500)
    t(864, y + 34, 'Why?', 12, CY, 600, 'end', True)

# Approval
r(924, 206, 452, 300)
t(948, 240, 'APPROVAL REQUIRED', 12, '#f59e0b', 700, mono=True)
t(948, 276, 'Move "Weekly 1:1" to 14:00', 18, TP, 600)
for j, line in enumerate(['External calendar change · affects 1 attendee', 'Proposed by VECTOR · reviewed by SENTINEL (pass)',
                          'Both attendees free at 14:00 · no new conflicts', 'Reversible · expires 10:30']):
    t(948, 306 + j * 24, '· ' + line, 13, TS)
r(948, 420, 120, 40, CY, CY, 8)
t(1008, 446, 'Approve', 14, '#04111f', 700, 'middle')
r(1080, 420, 110, 40, PANEL2, BORDER, 8)
t(1135, 446, 'Reject', 14, TP, 600, 'middle')
t(1210, 446, 'Why?', 13, CY, 600, mono=True)

# Execution & recovery
r(924, 526, 452, 320)
t(948, 560, 'RECENT EXECUTION & RECOVERY', 12, TM, 700, mono=True)
steps = [('Wed 16:12', 'Executed', 'task status update · attempt 1', '#34d399'),
         ('Wed 16:12', 'Verified', 're-read task: status done', '#34d399'),
         ('Wed 11:40', 'Reconciled', 'ambiguous write · re-read, no resend', '#f59e0b'),
         ('Wed 09:05', 'Escalated', 'stale context · action blocked', '#f87171')]
for k, (tm, st, d, c) in enumerate(steps):
    y = 598 + k * 58
    o.append(f'<circle cx="956" cy="{y}" r="6" fill="{c}"/>')
    if k < 3:
        o.append(f'<line x1="956" y1="{y + 8}" x2="956" y2="{y + 50}" stroke="{BORDER}" stroke-width="2"/>')
    t(976, y + 5, st, 15, TP, 600)
    t(1352, y + 5, tm, 12, TM, 400, 'end', True)
    t(976, y + 26, d, 12, TS)

t(W - 64, 880, 'SYNTHETIC RECREATION — no real people, messages or events', 11, '#f59e0b', 600, 'end', True)
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">' + ''.join(o) + '</svg>'
cairosvg.svg2png(bytestring=svg.encode(), write_to='screenshots/today-attention.png')
