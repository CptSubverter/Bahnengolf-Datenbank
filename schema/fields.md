# Kanonische Felder

## players
player_id, pass_number, name, normalized_name, current_club_id, current_association_id, identity_status, source_records

## clubs
club_id, canonical_name, normalized_name, historical_names, association_ids, source_records

## associations
association_id, abbreviation, canonical_name, source_records

## tournaments
tournament_id, date, name, location, source_ids, source_records

## results
result_id, player_id, tournament_id, place, category, total, average, source_record_id, identity_match_status

## rounds
round_id, result_id, round_number, score, source_record_id

## drl_entries
drl_entry_id, player_id, list_date, rank, value, category, club_original, lv_original, source_record_id

## dmv_entries
dmv_entry_id, player_id, tournament_id, source_record_id, original_name, original_club, match_status

## historical_player_clubs
player_club_id, player_id, club_id, valid_from, valid_to, source_record_id

Original source values are retained for traceability.
