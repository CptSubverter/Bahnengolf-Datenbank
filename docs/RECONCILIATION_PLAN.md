# Reconciliation-Plan

## Verbindliche Identitätskette

1. Passnummer
2. vorhandene stabile Spieler-ID
3. eindeutiger normalisierter Name
4. Name + Verein
5. Name + Verein + Landesverband + Jahr
6. zusätzliche Turnierdaten

## Niemals automatisch

- gleiche Namen bei mehreren Personen zusammenführen
- Turnierteilnahme ohne Ergebnis erzeugen
- DRL/DMV-Eintrag nur wegen Namensähnlichkeit einem Spieler zuweisen
- alte player_key-/history-Beziehungen als Beweis verwenden

## Aktueller geprüfter Ausgangspunkt

Das vorhandene Neustart-Archiv enthält 7.564 Spieler, 156.744 Ergebnisse und 27.501 Ergebnisdatensätze mit Rundendaten. Die im Archiv enthaltene Auditdatei weist 3 ausdrücklich ungelöste Ergebnisse aus. Diese werden separat behandelt.

Die drei derzeit ungelösten Ergebniszeilen sind:
- Eva Dürholt — 51. internationales Osterturnier (Beton), Weinheim, 2016
- Thomas Nuhn — 51. internationales Osterturnier (Beton), Weinheim, 2016
- Thomas Nuhn — 51. internationales Osterturnier (Miniaturgolf), Weinheim, 2016

Sie werden nicht künstlich einem Spieler zugeordnet.

## DRL

Das DRL-Archiv enthält 76 XLS-Dateien mit jeweils einer DRL-Tabelle und teilweise einer Turnierliste. Die Passnummer ist dort vorhanden und wird für den Abgleich bevorzugt.

## DMV

Die DMV-Ergebnis- und Teilnahmearchive werden unabhängig gegen die kanonische Spielerbasis geprüft. Quellenzeilen bleiben nachvollziehbar.

## Freigabekriterium

Die Webdaten werden erst veröffentlicht, wenn der Audit keine kritischen Identitäts- oder Fremdschlüsselverletzungen meldet.
