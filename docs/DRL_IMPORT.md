# DRL-Import – Zwischenstand

Die 152 Dateien im Originalarchiv bestehen aus 76 echten XLS-Dateien plus 76 macOS-Metadatendateien. Die Metadateien werden nicht als Datenquelle verarbeitet.

Die 76 echten XLS-Dateien wurden über LibreOffice in XLSX konvertiert, ohne die Originale zu verändern.

## Auswertung

- echte DRL-Dateien: 76
- erfolgreich strukturierte DRL-Dateien: 75
- technisch beschädigte/unklar lesbare Datei: 1 (`rangliste83_2.xls`)
- strukturierte DRL-Einträge: 213.155
- eindeutige DRL-Passnummern: 6.539
- davon mit exakt vorhandener Passnummer in der aktuellen Spielerkandidatenbasis: 6.438
- DRL-Passnummern ohne aktuelle Spielerkandidatenbasis: 101

## Identitätsregel

Die 6.438 exakten Passnummern-Matches werden als starke Kandidaten für `pass_verified` behandelt. Die 101 nicht vorhandenen Passnummern werden **nicht** automatisch einem Spieler zugeordnet.

Historische Vereins- oder Namensabweichungen bleiben als Quellenwerte erhalten. Eine abweichende Vereinsangabe bedeutet nicht automatisch eine neue Person, da Vereinswechsel und historische Schreibweisen vorkommen.

## Problemdatei

`rangliste83_2.xls` ist technisch so beschädigt bzw. ungewöhnlich formatiert, dass die Tabellenstruktur nicht zuverlässig rekonstruiert werden konnte. Sie bleibt als Originalquelle erhalten und wird als `source_unreadable` protokolliert, statt Daten zu erfinden.

## Nächster Schritt

Die DRL-Datensätze werden nun mit der kanonischen Spielerbasis verbunden und anschließend gegen DMV-Ergebnisse und DMV-Teilnahmen geprüft.
