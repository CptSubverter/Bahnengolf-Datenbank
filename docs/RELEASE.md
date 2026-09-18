# Release Candidate v0.1

This release establishes the canonical relational data model and audit gates. DMV records without pass numbers are reconciled by exact normalized name where unique, with club/year/tournament context for duplicate names. Historical derived player keys are not identity proof.

Release status: candidate; final publication remains blocked until all source layers are materialized and the complete foreign-key audit passes.
