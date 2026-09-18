# Quelleninventur

## Primärquellen

| Quelle | Bestand | Verwendung |
|---|---:|---|
| DRL Archiv | 152 XLS | historische DRL-Aufnahmen |
| DMV Ergebnisse 2015–2025 | 9 XLSX | Turnierergebnisse und Runden |
| DMV Teilnahmen 2015–2025 | 9 JSON + CSV | Teilnahmeabgleich |
| Spielerdatenbank Neustart | 25 JSON + CSV | Kandidaten-/Stammdaten, nicht als Beziehungsquelle |

## Regeln

1. Originaldaten bleiben unverändert.
2. __MACOSX-Dateien sind technische Duplikate und werden nicht als eigene Datenquelle verarbeitet.
3. Abgeleitete Daten aus alten Datenbankversionen werden nicht als Beweis für eine Identität verwendet.
4. Jede importierte Zeile erhält eine Quellenreferenz.
5. Beziehungen entstehen erst nach dem Reconciliation-Schritt.
