# Datenmodell – Status

## Kanonische Stammdaten

- Associations: 13 offizielle DMV-Landesverbände
- Players: werden aus den Rohquellen reconciliert
- Clubs: werden unabhängig von Spielerzuordnungen kanonisiert
- Tournaments: entstehen ausschließlich aus belegten Turnier-/Ergebnisquellen
- Results: verweisen auf genau einen kanonischen Spieler und ein kanonisches Turnier
- Rounds: verweisen ausschließlich auf ein vorhandenes Resultat
- DRL entries: behalten den originalen DRL-Record und werden separat reconciliert
- DMV entries: behalten den originalen DMV-Record und werden separat reconciliert

## Freigabeprinzip

Keine Beziehung wird aus einer bloßen Ähnlichkeit erzeugt. Jede Beziehung muss entweder schlüsselbasiert verifiziert oder als unsicher/unaufgelöst gekennzeichnet werden.

Der nächste Verarbeitungsschritt ist die maschinelle Extraktion und Reconciliation der Rohdaten.
