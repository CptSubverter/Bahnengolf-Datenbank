# Identitätsabgleich – verbindliche Regeln

## Priorität

1. Passnummer
2. Spieler-ID
3. normalisierter Name
4. Name + Verein
5. Name + Verein + Landesverband + Jahr
6. zusätzliche Turniermerkmale

## Unicode und Umlaute

Die Normalisierung muss echte deutsche Zeichen korrekt behandeln:

- ä ↔ ae als zulässige Vergleichsvariante
- ö ↔ oe
- ü ↔ ue
- ß ↔ ss

Dabei gilt: Die Originalschreibweise wird immer gespeichert und nicht ersetzt.

Beispiele:
- Müller ↔ Mueller
- Höver ↔ Hoever
- Härle ↔ Haerle
- Weiß ↔ Weiss

Auch typische UTF-8/Windows-1252-Fehlkodierungen werden erkannt und normalisiert, z. B. AndrÃ© → André.

## Passnummer

Eine identische, sauber erkannte Passnummer ist der stärkste automatische Identifikator.

Wenn dieselbe Passnummer in widersprüchlichen Personendaten vorkommt, wird der Datensatz als Konflikt protokolliert. Es erfolgt keine stille Zusammenführung.

## Namen

Namen werden für den Vergleich normalisiert, aber die Originalwerte bleiben erhalten.

Die Normalisierung berücksichtigt:
- Unicode-Normalform
- Groß-/Kleinschreibung
- Umlaute und ß
- typische Encodingfehler
- überflüssige Leerzeichen
- Satz-/Trennzeichen

Ein Namensmatch allein reicht nicht aus, wenn mehrere Personen denselben oder einen sehr ähnlichen Namen besitzen.

## Vereinsnamen

Historische Schreibweisen und e.V.-Varianten werden normalisiert. Mannschaftssuffixe I/II/III bzw. 1/2/3 werden nur für die kanonische Vereinsidentität ignoriert; der Originalwert bleibt erhalten.

## Ergebnis

Jede Zuordnung erhält einen Match-Status:
- pass_verified
- player_id_verified
- name_unique
- name_plus_club_verified
- ambiguous
- unresolved

Unsichere Datensätze bleiben sichtbar, werden aber nicht falsch verknüpft.
