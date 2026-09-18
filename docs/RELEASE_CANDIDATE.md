# Release Candidate v0.1

Der relationale Datenbestand ist als Build-Schema vorbereitet. Die acht Entitäten und ihre Beziehungen sind definiert; die großen Quelltabellen werden in separaten, reproduzierbaren Importartefakten gehalten.

## Release-Gate

Der aktuelle Stand ist **kein finaler Release**. DMV-Identitäten mit fehlender oder mehrdeutiger Evidenz bleiben offen. Die vollständige Materialisierung aller Quellzeilen in kanonische JSON-Shards erfolgt im nächsten Build-Schritt.

## Navigationsmodell

Spieler ↔ Ergebnisse ↔ Turniere ↔ Runden
Spieler ↔ DRL
Spieler ↔ DMV
Spieler ↔ historische Vereine ↔ Landesverbände
