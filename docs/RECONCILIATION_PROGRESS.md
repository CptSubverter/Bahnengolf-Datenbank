# Reconciliation-Fortschritt

## DRL

Das DRL-Archiv enthält 76 fachliche Listen. 75 Dateien wurden nach automatischer Erkennung der Kopfzeile strukturell erfolgreich eingelesen.

Auditierter Stand:
- 210.503 DRL-Datenzeilen
- 6.361 unterschiedliche Passnummern
- 210.503 Zeilen per Passnummer genau einem Spieler-Kandidaten zugeordnet
- 0 nicht zugeordnete Passnummern
- 193 Passnummern mit historischen Namensvarianten

Eine Datei (rangliste83_2.xls) ist technisch nicht als normales BIFF-Arbeitsbuch lesbar und bleibt bis zu einer validen Quelldarstellung ausgeschlossen.

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
