# DRL-Import – Status 2026-09-18

## Technischer Import

Das komplette DRL-Archiv wurde identifiziert und technisch aus den alten XLS-Dateien in XLSX-Arbeitsdateien konvertiert.

- Rohdateien im Archiv: 152
- technische Mac-OS-X-Metadateien: 76
- fachliche DRL-Dateien: 76
- fachliche Dateien mit erkannter Pass-Spalte: 75+
- Pass-Spalte wurde in den DRL-Dateien strukturell erkannt; sie steht nicht als feste erste Tabellenzeile.

## Importregel

Die Kopfzeile wird je Datei anhand der Spaltenbezeichnung erkannt. Anschließend werden nur tatsächliche Datenzeilen mit numerischer Passnummer als DRL-Einträge übernommen.

Zu jedem Eintrag bleiben erhalten:
- Quelldatei
- Passnummer
- Originalname
- Kategorie
- Originalverein
- Original-LV
- Rang
- Ranglistenwert

## Reconciliation

Die Passnummer ist der primäre Identitätsschlüssel.

Ein DRL-Eintrag darf nicht allein wegen Namensähnlichkeit einem Spieler zugeordnet werden.

Konflikte zwischen Passnummer, Name, Verein oder LV werden als Audit-Fälle protokolliert.

## Aktueller Stand

Die technische XLS-Verarbeitung ist abgeschlossen. Die vollständige fachliche Extraktion und anschließende Pass-Reconciliation läuft als separater Verarbeitungsschritt.

**Wichtig:** Die Daten werden erst nach erfolgreicher Reconciliation als kanonische DRL-Beziehungen veröffentlicht.
