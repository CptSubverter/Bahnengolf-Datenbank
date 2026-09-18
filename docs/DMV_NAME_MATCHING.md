# DMV-Identitätsregel – exakte Namen

Bei DMV-Datensätzen ohne Passnummer darf ein **exakt gleicher, normalisierter Personenname** miteinander verknüpft werden, wenn die Schreibweise nach Normalisierung identisch ist.

Dabei gilt:
- Exakter gleicher Name ist ein zulässiges Matching-Signal.
- Wenn nur ein Spieler mit diesem Namen in der kanonischen Basis vorkommt, darf die DMV-Zeile direkt diesem Spieler zugeordnet werden.
- Wenn mehrere Spieler exakt denselben Namen tragen, wird zusätzlich Verein, Jahr, Turnier, Ort und historische DRL-Zuordnung verwendet.
- Stimmen diese Kontextdaten nicht ausreichend überein, bleibt der Datensatz mehrdeutig.
- Unterschiedliche Schreibweisen werden separat normalisiert und nur bei ausreichender Evidenz zusammengeführt.
- Alte player_key-/pass-Felder aus abgeleiteten DMV-Dateien sind kein Identitätsnachweis.

Ziel ist eine möglichst vollständige Verknüpfung, ohne zwei tatsächlich verschiedene Personen mit gleichem Namen zusammenzuführen.
