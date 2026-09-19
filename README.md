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

## Veröffentlichung

Die Anwendung ist für die acht kanonischen DRL-Shards vorbereitet. Die Shards liegen als geprüfter lokaler Build vor, sind aber noch nicht vollständig im öffentlichen Repository veröffentlicht. Bis zur Veröffentlichung bleibt dieser Punkt ein Release-Blocker.

Die Datenbank verwendet keine Daten aus der nicht lesbaren `rangliste83_2.xls`.

## Projektziel

Eine durchsuchbare, responsive Datenbank mit stabilen Verknüpfungen zwischen Spieler, Passnummer, Verein, Verband, Turnier, Ergebnis, Runde, DRL und DMV.
