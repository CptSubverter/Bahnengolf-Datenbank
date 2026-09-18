# Reconciliation-Fortschritt

## DRL-Technik

Das historische DRL-Archiv besteht aus 76 XLS-Dateien. Die Dateien können technisch zuverlässig über LibreOffice in XLSX konvertiert und anschließend gelesen werden. Alle 76 Dateien wurden erfolgreich konvertiert.

Die DRL-Tabelle enthält einen expliziten Pass-Schlüssel sowie Name, Kategorie, Verein und Landesverband. Damit ist die Passnummer der vorgesehene primäre Abgleichsschlüssel.

Ein Stichprobenlauf über 10 DRL-Dateien ergab 29.188 DRL-Zeilen mit 6.025 unterschiedlichen Passnummern. 63 dieser Passnummern waren in der bisherigen Spielerdaten-Ausgangsdatei nicht vorhanden. Diese 63 Fälle werden nicht automatisch einer Person zugeordnet; sie müssen als historische/externe Kandidaten behandelt und gegen weitere Quellen geprüft werden.

## Wichtige Konsequenz

Die bisherige Spielerdaten-Datei ist nicht die endgültige Wahrheit. Sie enthält neben echten Personen auch passlose/sonstige Einträge aus historischen Quellen. Deshalb wird die neue kanonische Spielerbasis erst nach dem Quellvergleich freigegeben.

## DMV

Das DMV-Ergebnisarchiv ist heterogen aufgebaut: Die Jahresdateien enthalten neben Ergebniszeilen auch Kopf-, Schiedsgerichts-, Ausschreibungs- und Metadatenzeilen. Die Ergebniszeilen müssen daher anhand ihrer Struktur extrahiert werden; die Excel-Zeile darf nicht pauschal als Spielerzeile interpretiert werden.

Die Zeichenkodierung wird beim Import normalisiert, die Originalschreibweise bleibt erhalten.

## Status

- [x] DRL-Archiv technisch vollständig zugänglich
- [x] Pass-Spalte im DRL identifiziert
- [x] DRL-Stichprobenabgleich gestartet
- [x] DMV-Dateistruktur geprüft
- [ ] vollständiger DRL-Passabgleich
- [ ] vollständiger DMV-Spielerabgleich
- [ ] kanonische Spielerbasis freigeben
- [ ] Gesamt-Audit
