# ID-Strategie

Interne IDs werden neu und deterministisch erzeugt.

- player_id: stabile kanonische Personen-ID
- club_id: stabile kanonische Vereins-ID
- association_id: stabile LV-ID
- tournament_id: stabile Turnier-ID aus Quelle/Datum/Ort
- result_id: stabile Ergebnis-ID aus Quelle + Turnier + Spieler
- round_id: stabile Runden-ID aus Ergebnis + Rundennummer
- drl_entry_id: stabile ID aus DRL-Quelle + Ranglistenzeile
- dmv_entry_id: stabile ID aus DMV-Quelle + Quellrecord

Externe Passnummern und Original-IDs bleiben erhalten und sind niemals die interne Datenbank-ID.
