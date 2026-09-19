# Nächster Reconciliation-Schritt

## Reihenfolge

1. DRL-Archiv erneut gegen den kanonischen Stand prüfen.
2. DMV-Teilnahmequelle 2015–2025 mit dem vorhandenen Quellschlüssel `pass/player_key` gegen die 6.438 kanonischen Spieler abgleichen.
3. DMV-Ergebnisdaten und Teilnahmehistorie getrennt halten.
4. Turniere über stabile Turniercodes zusammenführen.
5. Ergebnisse und Rundenergebnisse über `result_id` verknüpfen.
6. Historische Vereinszugehörigkeiten über die bereits geprüfte Vereinsnormalisierung anbinden.
7. Erst danach kanonische JSON-Shards veröffentlichen.

## Fail-closed

Unklare Identitäten werden nicht automatisch zu Spielern. Ein Datensatz darf erst als relationale Spielerzuordnung veröffentlicht werden, wenn die Zuordnung durch Passnummer oder eine dokumentierte, eindeutige Reconciliation bestätigt ist.
