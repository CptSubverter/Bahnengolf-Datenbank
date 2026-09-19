# Reconciliation-Fortschritt

## DRL

Das DRL-Archiv enthält 76 fachliche Listen. 75 Dateien wurden nach automatischer Erkennung der Kopfzeile strukturell erfolgreich eingelesen.

Auditierter Stand:
- 213.155 DRL-Datenzeilen aus 75 strukturell lesbaren Listen
- 6.539 unterschiedliche Passnummern
- 213.155 Zeilen mit numerischer Passnummer
- 193 Passnummern mit historischen Namensvarianten
- Zusätzlich wurde `rangliste79.xls` als gültige, bisher versehentlich ausgeschlossene DRL-Liste identifiziert: +2.652 Zeilen und +178 Passnummern gegenüber dem bisherigen kanonischen Stand

Eine Datei (`rangliste83_2.xls`) bleibt wegen der ungewöhnlichen/malformed Tabellenstruktur bis zu einer validen Quelldarstellung ausgeschlossen. Die übrigen 75 Listen sind jetzt technisch lesbar.

## DMV-Ergebnisse 2015–2025

Die DMV-Ergebnisdateien enthalten keine Passnummern. Deshalb wird die Identität ausdrücklich über Namen und anschließend über historische Vereinszuordnung geprüft.

Aktueller Abgleich von 52.915 bereinigten Ergebniszeilen:
- 29.263 eindeutige Namenszuordnungen über die historische DRL-Spielerhistorie
- 368 weitere Zuordnungen über Name + historisch belegten Verein bzw. einen konservativen Fuzzy-Kandidaten mit passendem Verein
- 123 mehrdeutige Namensfälle bleiben unverbunden
- 23.161 Fälle bleiben vorerst unverbunden

Die 23.161 unverbundenen Fälle werden **nicht** automatisch als neue Spieler angelegt. Darunter befinden sich auch Zeilen, deren Name offenbar kein Personenname ist oder deren Person in der aktuellen Kandidatenbasis noch nicht eindeutig nachweisbar ist.

### Abgleichregeln für DMV

1. exakter normalisierter Name gegen historische DRL-Namen
2. bei mehreren Personen: Verein + historische DRL-Vereinszuordnung
3. bei fehlendem exakten Treffer: nur konservative Namensähnlichkeit zusammen mit einem exakt belegten historischen Verein
4. keine Zuordnung allein aufgrund einer ähnlichen Schreibweise
5. ungeklärte Fälle bleiben als Auditfälle erhalten

Damit wird die fehlende Passnummer der DMV-Quelle berücksichtigt, ohne falsche Spieleridentitäten zu erzeugen.

## Nächster Schritt

Die noch 23.284 nicht eindeutig verbundenen Fälle werden jetzt nach Ursachen gruppiert: Vereins-/Metazeilen, Schreibvarianten, fehlende historische Spieler, Sonderzeichen/Encoding und echte ungeklärte Personen. Danach werden die DMV-Rundenergebnisse mit den bereits identifizierten Ergebnisdatensätzen verknüpft.


# DMV-Teilnahmen – Importstatus

Die DMV-Teilnahmedaten 2015–2025 werden als eigene Quellschicht behandelt. Sie enthalten keine Passnummer und dürfen deshalb nicht unabhängig vom Identitätsabgleich einem Spieler zugeordnet werden.

Verknüpfungslogik:
1. exakter normalisierter Name
2. bei mehreren Kandidaten: Verein + Jahr + Turnier
3. Abgleich gegen bereits reconciliierte DMV-Ergebnisse
4. Abgleich gegen historische DRL-Vereins-/Namensdaten
5. bei verbleibender Mehrdeutigkeit: offen

Eine Teilnahme wird nicht als eigenständiger Beleg für eine Spieleridentität verwendet, wenn die Quelle keine ausreichende Identitätsinformation liefert. Resultatdaten bleiben die primäre Evidenz für die tatsächliche Turnierteilnahme.

Zielmodell:
Spieler ↔ DMV-Eintrag ↔ Turnier ↔ Ergebnis ↔ Runde

Originalname und Originalverein werden in jedem DMV-Eintrag erhalten.
