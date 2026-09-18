# Relational Build v0.1.0

The database is built around stable internal IDs.

## Core graph

Player <-> Historical Player Club <-> Club <-> Association
Player <-> Result <-> Tournament
Result <-> Round
Player <-> DRL Entry
Player <-> DMV Entry <-> Tournament

## Identity

DRL uses exact pass number.

DMV sources do not use a trusted pass number in this clean build. Exact normalized names may directly identify a player when the name is unique. When several players share the same exact name, club/year/tournament/location and historical DRL evidence are used. Unresolved identities remain explicitly unlinked.

## Source provenance

Every imported historical record keeps its original source reference and original textual values.
