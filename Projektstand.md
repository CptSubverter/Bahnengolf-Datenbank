# Projektstand – Bahnengolf-Datenbank

**Stand:** 19.09.2026  
**Repository:** CptSubverter/Bahnengolf-Datenbank  
**Branch:** main

## Ziel

Aufbau einer vollständig neu reconciliierten Bahnengolf-Datenbank. Alle relevanten Entitäten sollen bidirektional verknüpft und später in der Weboberfläche anklickbar sein:

**Spieler ↔ Verein ↔ Landesverband ↔ Turnier ↔ Ergebnis ↔ Runde ↔ DRL ↔ DMV**

Die alte Datenbank dient nur als Quelle bzw. Vergleichsmaterial. Alte, bereits abgeleitete Beziehungen werden nicht ungeprüft übernommen.

## Aktueller Datenbestand

### Spieler
- 6.438 Spieler-Kandidaten
- 6.438 eindeutige Player-IDs
- 0 doppelte nichtleere Passnummern

### DRL
- 152 XLS-Dateien im Archiv
- 76 fachliche DRL-Listen
- 75 Dateien strukturell erfolgreich eingelesen
- 210.503 DRL-Datenzeilen
- 6.361 unterschiedliche Passnummern
- 1 technisch problematische Datei: rangliste83_2.xls

Die Passnummer ist bei DRL-Quellen der primäre Identitätsschlüssel. Historische Namensvarianten bleiben erhalten.

### Vereine
- 402 kanonische Vereine
- 34.195 historische Spieler-Verein-Beobachtungen
- 6.195 Spieler mit mindestens einer bestätigten historischen Vereinszuordnung

Mannschaftssuffixe I/II/III bzw. 1/2/3 werden für die kanonische Vereinsidentität ignoriert; die Originalbezeichnung bleibt erhalten.

### Landesverbände
Es werden die 13 offiziellen DMV-Landesverbände geführt: BBS, BMV, BVBB, BVSA, BVS, HBSV, HBV, MRP, MVBN, NBV, SaarMV, SHMV und WBV.

Zwei Vereine zeigen widersprüchliche historische Verbandsbeobachtungen. Diese werden als Quellenkonflikte erhalten und nicht überschrieben.

### DMV-Ergebnisse
Die DMV-Ergebnisquellen enthalten keine verlässliche Passnummer für den Neustart. Deshalb erfolgt der Identitätsabgleich über Namen und Kontext.

- 52.915 Ergebniszeilen
- 963 Turniere
- 135.837 einzelne Rundenergebnisse
- bis zu 24 Runden pro Ergebnis
- 0 Runden ohne übergeordnetes Ergebnis
- 0 Ergebnisse ohne Turnier
- 29.522 Ergebnisse mit Player-ID
- 23.303 Ergebnisse ohne eindeutige Player-ID
- 90 davon ausdrücklich mehrdeutig

Offene Datensätze werden nicht künstlich einem Spieler zugeordnet.

### DMV-Teilnahmen
Die DMV-Teilnahmen werden als eigene Quellschicht behandelt. Alte player_key- oder bereits abgeleitete pass-Felder gelten nicht als Identitätsnachweis.

Die Zuordnung erfolgt über Name, Verein, Jahr, Turnier/Datum, Ergebnis und historische DRL-Evidenz.

## Matching-Regeln

1. Passnummer, wenn die Quelle sie zuverlässig enthält
2. stabile Spieler-ID, wenn unabhängig belegt
3. exakter normalisierter Name
4. bei identischen Namen: Verein, Jahr, Turnier und Ort
5. historische DRL-Vereins- und Namenszuordnung
6. weitere belastbare Quelldaten

Exakt gleiche Namen dürfen verknüpft werden, wenn innerhalb der geprüften Spielerbasis nur eine Person eindeutig angesprochen wird. Bei mehreren Personen mit gleichem Namen bleibt der Fall ohne ausreichenden Kontext mehrdeutig.

## Zielmodell

Spieler ↔ historische Vereinszugehörigkeit ↔ Verein ↔ Landesverband

Spieler ↔ Ergebnis ↔ Turnier ↔ Runde

Spieler ↔ DRL-Eintrag

Spieler ↔ DMV-Eintrag ↔ Turnier ↔ Ergebnis ↔ Runde

Alle Beziehungen sollen stabile interne IDs und Quellenreferenzen besitzen.

## Audit-Regeln

Ein finaler Release darf nicht erfolgen bei:

- doppelten Player-IDs
- doppelten gültigen Passnummern
- ungültigen Fremdschlüsseln
- Ergebnis ohne Turnier
- Runde ohne Ergebnis
- stillschweigend verknüpften mehrdeutigen Personen
- DMV-Zuordnung ausschließlich aufgrund unsicherer Namensähnlichkeit
- fehlender Quellenprovenienz

Unklare Fälle bleiben erhalten und bekommen einen eindeutigen Prüfstatus.

## Bereits dokumentiert

Im neuen Repository vorhanden sind unter anderem:

- Grundarchitektur und Datenmodell
- Quellenregeln
- Reconciliation-Plan
- ID-Strategie
- Release-Gates
- kanonische Spielerbasis-Regeln
- DRL-Importstatus
- DMV-Matching-Regeln
- Vereins-/Verbands-Reconciliation
- aktuelle Auditdateien

## Nächste Schritte

1. kanonische Spielerdatei finalisieren
2. kanonische Vereins- und Verbandsdateien finalisieren
3. historische Spieler-Vereinsrelation veröffentlichen
4. Turniere, Ergebnisse und Runden final veröffentlichen
5. DRL- und DMV-Relationen vollständig aufbauen
6. Gesamt-Fremdschlüssel- und Identitätsaudit durchführen
7. Weboberfläche mit bidirektional anklickbaren Entitäten bauen
8. GitHub Pages veröffentlichen und anschließend in Bahnengolf.net einbinden

## Wichtig

Der aktuelle Stand ist ein **Projekt-/Reconciliation-Stand und noch kein finaler Release**. Zwischenstände aus einzelnen Verarbeitungsläufen werden nicht automatisch als endgültige Datenbasis betrachtet.

Die Rohquellen bleiben maßgeblich. Jede veröffentlichte Beziehung muss nachvollziehbar belegt sein.
