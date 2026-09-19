# Projektstand.md

## Projekt

**Bahnengolf-Datenbank – kompletter Neustart**

Repository: `CptSubverter/Bahnengolf-Datenbank`  
Branch: `main`

Das alte Projekt `CptSubverter/Spielerdatenbank` ist **nicht** die Grundlage des Neustarts. Alte, bereits abgeleitete Beziehungen dürfen nicht ungeprüft übernommen werden.

## Ziel

Eine vollständig relationale, klickbare Bahnengolf-Datenbank, in der alle zentralen Entitäten miteinander verbunden sind:

**Spieler ↔ Verein ↔ Landesverband ↔ Turnier ↔ Ergebnis ↔ Runde ↔ DRL ↔ DMV**

Jede Entität soll später in der Weboberfläche anklickbar sein und Rückverknüpfungen besitzen.

Beispiele:

- Spieler → alle Turniere, Ergebnisse, Runden, Vereine, Verbände, DRL- und DMV-Einträge
- Turnier → alle Ergebnisse und Spieler
- Ergebnis → Spieler, Turnier und Runden
- Runde → zugehöriges Ergebnis und Spieler
- Verein → Spieler, historische Vereinszugehörigkeiten und Ergebnisse
- Landesverband → Vereine und Spieler
- DRL-Eintrag → Spieler, Verein, Verband
- DMV-Eintrag → Spieler, Turnier und Ergebnis

---

## Verbindliche Datenquellen

### 1. Spielerdatenbank Neustart

`Spielerdatenbank_NEUSTART_2015_2025.zip`

Diese Quelle liefert die Ausgangsbasis für Spieler und Vereine.

**Wichtig:** Bereits vorhandene historische Beziehungen aus dieser Datei sind nicht automatisch vertrauenswürdig. Sie werden nur als Quellinformation verwendet und gegen die Primärquellen geprüft.

Aktueller Kandidatenstand:

- 6.438 Spieler
- 6.438 eindeutige Passnummern
- 0 doppelte gültige Passnummern

### 2. DRL-Archiv

`DRL Archiv.zip`

- 152 XLS-Dateien insgesamt
- 76 fachlich relevante DRL-Dateien
- 75 Dateien aktuell strukturell erfolgreich eingelesen
- 1 Datei (`rangliste83_2.xls`) technisch problematisch und deshalb nicht durch erfundene Daten ersetzt

Bisheriger Auditstand:

- 210.503 DRL-Datensätze
- 6.361 unterschiedliche Passnummern
- 0 nicht zugeordnete Passnummern im bisherigen Passabgleich
- Passnummer ist bei DRL der primäre Identitätsschlüssel
- historische Namensvarianten bleiben erhalten

### 3. DMV-Ergebnisse

`DMV Ergebnisse 2015-2025.zip`

Enthaltene Jahresdateien:

- 2015
- 2016
- 2017
- 2018
- 2019
- 2022
- 2023
- 2024
- 2025

2020 und 2021 sind in diesem Ergebnisarchiv nicht enthalten.

Aktueller Extraktionsstand:

- 52.915 bereinigte Ergebniszeilen
- bis zu 24 Rundenspalten
- 135.837 einzelne Rundenergebnisse
- 963 erkannte Turnierdatensätze im bisherigen Extraktionsstand

**Wichtig:** DMV-Ergebnisdaten besitzen keine verlässliche originale Passnummer als Identitätsschlüssel.

Deshalb:

**DMV → Name → Verein/Jahr → Turnier/Ort → DRL-Historie → Spieler**

### 4. DMV-Teilnahmen

`DMV_Teilnahmen_2015_2025_VOLLSTAENDIG.zip`

Die Teilnahmedaten werden als eigene Quellschicht behandelt.

Alte Felder wie `player_key` oder ein bereits abgeleitetes `pass` dürfen **nicht** als neuer Identitätsschlüssel verwendet werden.

---

# Identitäts- und Matching-Regeln

## DRL

Primär:

1. Passnummer
2. stabiler Spieler-ID-Nachweis
3. Name zur Kontrolle
4. Verein/LV zur Plausibilisierung

Eine stabile Passnummer hat Vorrang vor Namensvarianten.

## DMV

Da keine verlässliche Passnummer vorhanden ist:

1. exakter normalisierter Name
2. Verein
3. Jahr
4. Turnier
5. Ort
6. historische DRL-Vereins-/Namensdaten

### Exakt gleiche Namen

**Exakt gleiche normalisierte Namen dürfen verknüpft werden.**

Wenn nur ein Spieler mit diesem Namen in der kanonischen Spielerbasis existiert, ist der exakte Name ein ausreichendes Matching-Signal.

Wenn mehrere Spieler denselben Namen tragen, müssen Verein, Jahr, Turnier, Ort und historische Quellen zur Unterscheidung herangezogen werden.

Bei widersprüchlicher Evidenz bleibt der Datensatz mehrdeutig.

### Niemals

- zwei Personen nur wegen ähnlicher Namen zusammenführen
- alte `player_key`-Beziehungen als Beweis übernehmen
- alte künstliche Passzuordnungen als Beweis übernehmen
- ein Turnier ohne Ergebnis als Teilnahme erzeugen
- unsichere Identitäten stillschweigend verknüpfen

---

# Vereinsregeln

Vereine werden unabhängig von Spielern kanonisiert.

Mannschaftsnummern wie:

- I / II / III
- 1 / 2 / 3

sind für die **Vereinsidentität zu ignorieren**, wenn sie lediglich die Mannschaft bezeichnen.

Die originale Schreibweise bleibt trotzdem im Quelldatensatz erhalten.

Beispiel:

- VfM Bottrop I
- VfM Bottrop II
- VfM Bottrop III

→ ein kanonischer Verein **VfM Bottrop**

Historische Vereinsnamen werden als historische Namen bzw. Beobachtungen erhalten.

---

# Landesverbände

Es werden die 13 offiziellen DMV-Landesverbände geführt:

- BBS
- BMV
- BVBB
- BVSA
- BVS
- HBSV
- HBV
- MRP
- MVBN
- NBV
- SaarMV
- SHMV
- WBV

Ein historischer Vereinswechsel zwischen Landesverbänden darf nicht überschrieben werden. Quellen- und Zeitbezug bleiben erhalten.

---

# Kanonische Entitäten

Die Datenbank besteht aus:

1. `player`
2. `club`
3. `association`
4. `tournament`
5. `result`
6. `round`
7. `drl_entry`
8. `dmv_entry`

Zusätzliche relationale Tabelle:

9. `historical_player_club`

---

# ID-Strategie

Interne IDs sind stabil und deterministisch.

- `player_id`
- `club_id`
- `association_id`
- `tournament_id`
- `result_id`
- `round_id`
- `drl_entry_id`
- `dmv_entry_id`

Externe Passnummern und Quell-IDs bleiben als separate Felder erhalten.

---

# Aktueller Datenstand

## Spieler

- 6.438 Kandidaten
- eindeutige Passnummern
- keine doppelten gültigen Passnummern

## Vereine

- 402 kanonische Vereinsdatensätze als Ausgangsbasis
- 367 davon durch DRL-Historie bestätigt
- 172 weitere historische Vereinsbezeichnungen wurden als Kandidaten erkannt
- historische Spieler-Vereins-Beobachtungen: 34.195

## Landesverbände

Alle 13 offiziellen Verbände sind im Schema angelegt.

## DMV-Ergebnisse

- 52.915 Ergebniszeilen
- 135.837 Rundeneinträge
- bisher 29.522 Ergebniszeilen mit `player_id`
- 23.303 Ergebniszeilen ohne eindeutige Spielerzuordnung
- 90 Fälle sind ausdrücklich mehrdeutig

Die offenen DMV-Fälle bleiben erhalten und werden nicht gelöscht.

## Turniere

Bisheriger Extraktionsstand:

- 963 Turnierdatensätze

Turnieridentität basiert grundsätzlich auf:

**Datum + normalisierter Turniername + normalisiertem Ort**

Vorhandene Quellkennungen werden zusätzlich gespeichert.

---

# Bekannte Sonderfälle

## DRL

`rangliste83_2.xls`

Diese Datei ist technisch nicht als normales BIFF-Arbeitsbuch lesbar.

Sie darf nicht durch geschätzte oder erfundene Daten ersetzt werden.

## Historische Namensvarianten

193 Passnummern zeigen im DRL-Verlauf unterschiedliche Namensschreibweisen.

Bei stabiler Passnummer werden diese als historische Varianten behandelt und nicht automatisch als verschiedene Personen angelegt.

## Vereins-/Verbandskonflikte

Zwei Vereine zeigen im historischen DRL-Abgleich unterschiedliche beobachtete Landesverbände.

Diese Fälle bleiben als Quellenkonflikte erhalten und werden nicht überschrieben.

---

# Bekannter Fehler aus dem alten Projekt

Die alten künstlich erzeugten JLP-Datensätze dürfen nicht wieder eingeführt werden.

Insbesondere:

- Michael Hoever, Pass 68364
- Rebecca Hoever, Pass 68365

Die alten JLP-Zuordnungen waren nicht durch die DRL-Quelle belegt und dürfen daher nicht als neue Beziehung übernommen werden.

Außerdem dürfen gleichnamige bzw. namenslose Turniere nicht allein aufgrund von Namen zusammengeführt werden.

Das **Datum ist Bestandteil der Turnieridentität**.

---

# Release-Gates

Ein Release ist nicht zulässig bei:

- doppelten kanonischen Spieler-IDs
- doppelten gültigen Passnummern
- verwaisten Fremdschlüsseln
- Ergebnis ohne Turnier
- Runde ohne Ergebnis
- DRL-Eintrag ohne nachvollziehbaren Spielerbezug
- unzulässiger DMV-Identitätszuordnung
- Konflikten zwischen Passnummer und Person
- ungültigem Landesverband
- doppelten kanonischen Vereinen
- fehlender Quellenprovenienz

Offene oder mehrdeutige Datensätze dürfen veröffentlicht werden, wenn ihr Status eindeutig gekennzeichnet und nachvollziehbar ist.

---

# Aktueller Projektstatus

## Bereits erledigt

- [x] neues GitHub-Repository erstellt
- [x] Architektur dokumentiert
- [x] Quellen dokumentiert
- [x] Datenmodell definiert
- [x] ID-Strategie definiert
- [x] Reconciliation-Regeln definiert
- [x] 13 Landesverbände angelegt
- [x] DRL-Archiv technisch untersucht
- [x] DRL-Passabgleich durchgeführt
- [x] DMV-Ergebnisdateien strukturell untersucht
- [x] DMV-Ergebnisse extrahiert
- [x] DMV-Rundenergebnisse extrahiert
- [x] DMV-Namensabgleich begonnen
- [x] DMV-Teilnahmedaten untersucht
- [x] historische Vereinszuordnungen untersucht
- [x] Vereins-/Verbands-Reconciliation begonnen
- [x] aktueller Integritätsaudit dokumentiert

## Noch offen

- [ ] DRL-Einträge als kanonische Relation veröffentlichen
- [ ] vollständige kanonische Vereinsdatei veröffentlichen
- [ ] historische Spieler-Vereins-Relation veröffentlichen
- [ ] kanonische Turnierdatei veröffentlichen
- [ ] kanonische Ergebnisdatei veröffentlichen
- [ ] kanonische Rundendatei veröffentlichen
- [ ] kanonische DMV-Einträge veröffentlichen
- [ ] vollständige DMV-Teilnahme-Reconciliation
- [ ] vollständiger Fremdschlüssel-Audit
- [ ] vollständiger Identitäts-Audit
- [ ] zentrale Index-/Relationsdatei
- [ ] Weboberfläche
- [ ] klickbare Navigation in beide Richtungen
- [ ] GitHub-Pages-Build
- [ ] Einbindung in Bahnengolf.net

---

# Nächster konkreter Build-Schritt

Nicht weiter nur Zwischenstände dokumentieren.

Der nächste Build muss die tatsächlich erzeugten Quelldaten in folgende veröffentlichte Struktur überführen:

```
data/
  players/
  clubs/
  associations/
  tournaments/
  results/
  rounds/
  drl/
  dmv/
  relations/
  audits/
```

Danach wird ein automatischer Gesamt-Audit ausgeführt.

Erst wenn dieser Audit bestanden ist, wird die Weboberfläche auf diesen Datenbestand gesetzt.

**Wichtig für jeden zukünftigen Chat:** Diese Datei ist der maßgebliche Projektstand. Vor einer Fortsetzung zuerst `docs/Projektstand.md` lesen und daran anknüpfen.
