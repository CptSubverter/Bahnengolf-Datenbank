# DMV-Ergebnisabgleich – Zwischenstand

Der erste strukturelle Import umfasst 53.329 Zeilen aus den DMV-Ergebnisdateien 2015–2025.

Für den Identitätsabgleich wurde zusätzlich eine reihenfolgenunabhängige Namensnormalisierung geprüft, weil die Quellen unterschiedliche Schreibweisen wie „Nachname, Vorname“ und „Vorname Nachname“ verwenden.

Zwischenstand:
- 29.116 Zeilen haben einen Namens-Treffer in der kanonischen Kandidatenbasis.
- 28.757 davon haben genau einen Spieler-Kandidaten.
- 359 Namensgruppen sind mehrdeutig.
- 24.213 Zeilen haben keinen eindeutigen Namens-Treffer.

Wichtig: Ein fehlender Namens-Treffer wird nicht automatisch als neuer Spieler angelegt. Ebenso werden mehrdeutige Namen nicht automatisch verknüpft.

Die 53.329 importierten Zeilen enthalten außerdem einzelne Vereins-/Teambezeichnungen, die im nächsten strukturellen Prüfschritt von echten Spielerzeilen getrennt werden müssen.

## Nächster Prüfschritt

1. echte Spielerzeilen von Vereins-/Team-/Metadatenzeilen trennen
2. eindeutige Namen mit Verein und Jahr gegen DRL-Historie prüfen
3. mehrdeutige Namen als Auditfälle halten
4. Rundenscores in einzelne Rundendatensätze zerlegen
5. Turniere aus Datum + Bezeichnung + Ort stabil identifizieren
