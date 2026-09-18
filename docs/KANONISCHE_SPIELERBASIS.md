# Kanonische Spielerbasis – Aufbau

Die Spielerbasis wird aus den verfügbaren Quellrecords neu erzeugt.

## Priorität der Quellen

1. Passnummern aus belastbaren Ergebnis-/DRL-Quellen
2. stabile Spieler-IDs aus Originalquellen
3. historische Spielerrecords
4. Namens- und Vereinsdaten nur zur Verifikation

## Wichtige Regel

Ein Quellrecord ohne Passnummer darf einen bestehenden Spieler nur dann erweitern, wenn die Identität anderweitig eindeutig belegt ist.

Mehrere Personen mit gleichem Namen werden niemals automatisch zusammengelegt.

## Vereinsdaten

Vereine werden unabhängig von der Spieleridentität kanonisiert. Schreibvarianten werden auf eine canonical_name-Form abgebildet; der Originalwert bleibt als source value erhalten.

Mannschaftssuffixe I/II/III bzw. 1/2/3 beeinflussen die kanonische Vereinsidentität nicht.

## Landesverbände

Nur bekannte offizielle LV-Codes werden als canonical association übernommen. Unbekannte oder offensichtlich fehlerhafte Werte bleiben als Originalwert erhalten und erzeugen einen Audit-Hinweis.

## Ergebnis

Die kanonische Spielerbasis ist erst freigegeben, wenn:
- Passnummern eindeutig sind
- Identitätskonflikte protokolliert sind
- Vereins- und LV-Beziehungen nachvollziehbar sind
- jeder Spieler mindestens einen source_record besitzt
