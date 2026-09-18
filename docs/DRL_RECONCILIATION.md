# DRL-Reconciliation – Ergebnis

## Identitätsabgleich

Die DRL-Datensätze wurden gegen die Spieler-Kandidatenbasis abgeglichen.

| Status | Datensätze |
|---|---:|
| pass_verified | 191,494 |
| pass_verified_name_conflict | 3,837 |
| name_plus_club_verified | 5,161 |
| name_unique | 1,957 |
| ambiguous | 130 |
| unresolved | 876 |
| **Gesamt** | **203,455** |

## Interpretation

**pass_verified** bedeutet: Die Passnummer ist in der Spielerbasis eindeutig vorhanden.

**pass_verified_name_conflict** bedeutet: Die Passnummer passt eindeutig, aber die Namensschreibweise weicht ab. Diese Fälle werden nicht verworfen; sie werden als Prüfbestand geführt, weil historische Schreibweisen, Umlaute, Encodingfehler und Namensänderungen möglich sind.

**name_plus_club_verified** und **name_unique** wurden nur bei fehlender Passnummernzuordnung verwendet.

**ambiguous** wird niemals automatisch verknüpft.

**unresolved** bleibt ohne Spieler-ID.

## Grundsatz

Die Passnummer ist der primäre Identifikator. Originalname, Originalverein und Original-Landesverband bleiben als Quellenwerte erhalten. Normalisierte Werte dienen ausschließlich dem Vergleich.

Der Abgleich ist damit eine geprüfte Reconciliation-Schicht und noch keine Veröffentlichung der endgültigen Datenbank.
