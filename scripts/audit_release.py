#!/usr/bin/env python3
"""
Bahnengolf-Datenbank – Release-Audit
Validates the published relational manifest and audit checkpoints.
This script intentionally fails closed: it never invents missing source data
and never converts unresolved identities into player links.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "data" / "RELATIONAL_MANIFEST.json"
AUDIT = ROOT / "data" / "FINAL_AUDIT_CURRENT.json"

def load(path):
    with path.open(encoding="utf-8") as f:
        return json.load(f)

def main():
    manifest = load(MANIFEST)
    audit = load(AUDIT)
    blockers = list(manifest.get("release_blockers", []))
    blockers += list(audit.get("release_blockers", []))

    checks = {
        "players": manifest["entities"]["players"] == audit["players"]["rows"],
        "clubs": manifest["entities"]["clubs"] == 402,
        "associations": manifest["entities"]["associations"] == 13,
        "drl_entries": manifest["entities"]["drl_entries"] == 210503,
        "historical_player_clubs": manifest["entities"]["historical_player_clubs"] == 34195,
        "dmv_results": manifest["entities"]["results"] == audit["dmv_results"]["rows"],
        "dmv_rounds": manifest["entities"]["rounds"] == audit["dmv_results"]["round_values"],
        "no_duplicate_passes": audit["players"]["duplicate_nonempty_pass_numbers"] == 0,
        "no_dangling_player_ids": audit["dmv_results"]["dangling_player_ids"] == 0,
        "no_orphan_rounds": audit["dmv_results"]["rounds_without_parent_result"] == 0,
    }

    print(json.dumps({"checks": checks, "release_blockers": sorted(set(blockers))}, ensure_ascii=False, indent=2))
    if not all(checks.values()) or blockers:
        raise SystemExit(2)

if __name__ == "__main__":
    main()
