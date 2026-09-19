# Bahnengolf-Datenbank

Relationale Bahnengolf-Datenbank für Spieler, Vereine, Verbände, Turniere, Ergebnisse, Runden, DRL und DMV-Daten.

## Aktueller geprüfter Datenstand

| Bereich | Anzahl |
|---|---:|
| Spieler | 6.438 |
| Vereine | 402 |
| Verbände | 13 |
| Turniere | 2.633 |
| DMV-Ergebnisse / Ergebnisdatensätze | 27.501 |
| Runden | 114.777 |
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

## Veröffentlichtes Kern-Datenmodell

Die geprüften Stammdaten sind jetzt öffentlich im Repository vorhanden:

- `data/players.csv`: **6.438 Spieler**
- `data/clubs.csv`: **402 Vereine**
- `data/associations.csv`: **13 Verbände**
- Spieler → aktueller Verein → Verband ist für den veröffentlichten Stammdatensatz verknüpft.

### Historische DRL-Nachverknüpfung

Zusätzlich wurden **87 historische DRL-Zeilen aus 17 historischen Passnummern** über einen geprüften Override verknüpft. Grundlage ist ausschließlich ein **eindeutiger Namensabgleich plus identische DRL-Quelldatei in der Spielerhistorie**. Es werden keine Fuzzy-Matches oder reine Vereinsvermutungen verwendet.

Damit bleiben im Laufzeit-Datenmodell **915 historische DRL-Zeilen aus 84 Passnummern** ausdrücklich ungeklärt. Die kanonischen DRL-Shards selbst bleiben unverändert und dokumentieren weiterhin 1.002 ursprünglich nicht verknüpfte Zeilen.

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

### Ergebnis-/Rundenquelle

Der aktuell veröffentlichte Ergebnisbestand umfasst **27.501 Ergebnisdatensätze**, **114.777 Einzelrunden** und **2.633 aus diesen Datensätzen abgeleitete Turniere**. Die Quelle ist `CptSubverter/Spielerdatenbank`, `data/rounds-01.json` bis `data/rounds-04.json`. Die zugrunde liegenden Jahre sind 2015–2019 sowie 2022–2025; 2020/2021 sind in dieser Quelle ausgeschlossen. Datensätze ohne eindeutige Passnummer werden nicht künstlich einem Spieler zugeordnet.

Eine durchsuchbare, responsive Datenbank mit stabilen Verknüpfungen zwischen Spieler, Passnummer, Verein, Verband, Turnier, Ergebnis, Runde, DRL und DMV.
