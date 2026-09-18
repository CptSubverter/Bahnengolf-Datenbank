# Identitätsabgleich

## Kanonischer Schlüssel

Der interne player_id wird neu erzeugt. Eine vorhandene Passnummer bleibt als externer, fachlich starker Schlüssel erhalten.

## Matchstatus

- pass_verified: Passnummer stimmt eindeutig überein.
- player_id_verified: stabile Quell-ID ist eindeutig und nachvollziehbar.
- name_unique: normalisierter Name ist im relevanten Datenbestand eindeutig.
- name_plus_club_verified: Name und Verein ergeben eine eindeutige Zuordnung.
- ambiguous: mehrere plausible Personen.
- unresolved: keine belastbare Zuordnung.

## Beweisprinzip

Jede Beziehung erhält:
- source
- source_record
- match_status
- match_method
- optional confidence_notes

Ein Match darf nicht allein durch einen ähnlichen Namen entstehen.

## Historische Vereine

Ein Spieler kann über die Jahre unterschiedliche Vereine haben. Deshalb wird der aktuelle Verein nicht als Ersatz für historische Vereinszuordnungen verwendet. Historische Vereinsbeziehungen werden separat modelliert.
