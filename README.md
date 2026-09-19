# Bahnengolf-Datenbank

Relationale Bahnengolf-Datenbank für Spieler, Vereine, Verbände, Turniere, Ergebnisse, Runden, DRL und DMV-Daten.

## Aktueller geprüfter Datenstand

| Bereich | Anzahl |
|---|---:|
| Spieler | 6.438 |
| Vereine | 402 |
| Verbände | 13 |
| Turniere | 963 |
| DMV-Ergebnisse | 52.915 |
| Runden | 135.837 |
| DRL-Einträge | 213.155 |
| DRL-Passnummern | 6.539 |
| Historische Spieler/Verein-Zuordnungen | 34.195 |

## DRL-Quelle

75 von 76 bereitgestellten DRL-Quellen sind lesbar und wurden verarbeitet.

- `rangliste79.xls`: **enthalten**, 2.652 Datensätze
- `rangliste83_2.xls`: **vollständig ausgeschlossen**
- Grund: Die entsprechende Originalquelle auf der Quellinternetpräsenz ist nicht lesbar.
- Es werden keinerlei Daten aus `rangliste83_2.xls` rekonstruiert oder übernommen.

Von 213.155 DRL-Zeilen sind derzeit 212.153 mit dem aktuellen Spielerbestand verknüpft. 1.002 historische Zeilen mit 101 unterschiedlichen Passnummern bleiben ausdrücklich ungeklärt und werden nicht künstlich Spielern zugeordnet.

## Relationale Struktur

- Spieler → aktueller Verein → Verband
- Spieler → historische Vereine
- Spieler → Turniere → Ergebnisse → Runden
- Spieler → DRL über Passnummer bzw. Player-ID, sofern eindeutig vorhanden
- DMV-Daten bleiben bei nicht eindeutiger Identität ausdrücklich als ungeklärt/mehrdeutig gekennzeichnet.

## DRL-Release-Paket

Der geprüfte kanonische Shard-Bestand ist als `DRL_CANONICAL_SHARDS_213155.zip` archiviert und enthält acht JSON-Shards mit zusammen **213.155 Datensätzen**.

Die Prüfinformationen zu allen acht Shards sind in `data/drl_release_package.json` dokumentiert.

Die acht JSON-Shards sind jetzt vollständig im öffentlichen Repository unter `data/` veröffentlicht. Zusammen enthalten sie **213.155 Datensätze**. Der veröffentlichte Bestand wurde vor der Veröffentlichung auf Vollständigkeit geprüft.

## Projektziel

Eine durchsuchbare, responsive Datenbank mit stabilen Verknüpfungen zwischen Spieler, Passnummer, Verein, Verband, Turnier, Ergebnis, Runde, DRL und DMV.
