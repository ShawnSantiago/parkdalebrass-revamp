#!/usr/bin/env python3
"""Fast checks for the redesign docs.

1. Every relative Markdown link in AGENTS.md, CLAUDE.md and docs/ points to a file that exists.
2. Every CSV under docs/ parses, and each row has the same number of columns as its header.

Exits non-zero with a list of problems. Standard library only.
"""
import csv
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
MD_FILES = [ROOT / "AGENTS.md", ROOT / "CLAUDE.md", *sorted((ROOT / "docs").rglob("*.md"))]
LINK = re.compile(r"\[[^\]]*\]\(([^)\s]+)\)")
problems = []

for md in MD_FILES:
    if not md.exists():
        continue
    text = md.read_text(encoding="utf-8")
    # Ignore fenced code blocks: they hold Liquid/CSS examples, not links.
    text = re.sub(r"```.*?```", "", text, flags=re.S)
    for target in LINK.findall(text):
        if re.match(r"^(https?:|mailto:|#|shopify://)", target):
            continue
        path = target.split("#", 1)[0]
        if not path:
            continue
        if not (md.parent / path).resolve().exists():
            problems.append(f"{md.relative_to(ROOT)}: broken link -> {target}")

for path in sorted((ROOT / "docs").rglob("*.csv")):
    with path.open(newline="", encoding="utf-8") as f:
        rows = list(csv.reader(f))
    if not rows:
        problems.append(f"{path.relative_to(ROOT)}: empty CSV")
        continue
    width = len(rows[0])
    for n, row in enumerate(rows[1:], start=2):
        if len(row) != width:
            problems.append(f"{path.relative_to(ROOT)}:{n}: {len(row)} columns, header has {width}")

if problems:
    print("Docs check failed:")
    print("\n".join(f"  - {p}" for p in problems))
    sys.exit(1)
print(f"Docs check passed: {len(MD_FILES)} Markdown files, CSVs under docs/ valid.")
