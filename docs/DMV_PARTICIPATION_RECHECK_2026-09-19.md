# DMV-Teilnahmen Recheck — 2026-09-19

Die erneut geprüfte Quelle `DMV_Teilnahmen_2015_2025_VOLLSTAENDIG.zip` enthält 9 Jahresdateien (2015–2019 sowie 2022–2025) mit insgesamt 156.744 Teilnahme-/Historienzeilen.

Die Quelle enthält entgegen einer älteren Dokumentation ein Feld `pass` bzw. `player_key`. Dieses Feld wird deshalb künftig als **Quellschlüssel** erhalten.

Wichtig für die Reconciliation:
- Der Quellschlüssel wird nicht blind als kanonische `player_id` übernommen.
- Er wird gegen die kanonische Spielerbasis und die DRL-Passnummern geprüft.
- Originalname, Originalverein, Jahr, Turniercode und Quelle bleiben erhalten.
- Nicht eindeutig bestätigte Zuordnungen bleiben als Auditstatus offen.
- Die bereits vorhandenen 52.915 DMV-Ergebniszeilen und 156.744 Teilnahmezeilen werden nicht stillschweigend vermischt.

Damit ist die bisherige Aussage „DMV-Teilnahmedaten enthalten keine Passnummer“ für diese konkrete Archivquelle veraltet und wird bei der nächsten Reconciliation korrigiert.
