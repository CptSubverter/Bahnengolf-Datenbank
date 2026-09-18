# Release Gates

Keine Veröffentlichung der Webdaten, wenn einer dieser Punkte fehlschlägt:

- duplicate canonical player IDs
- duplicate non-empty pass numbers
- dangling foreign keys
- result without tournament
- round without result
- unresolved identity silently linked
- tournament participation without source-backed result
- conflicting pass-to-person mappings
- invalid LV code
- canonical club duplicates
- source provenance missing

Warnungen dürfen bestehen bleiben, aber sie müssen sichtbar und nachvollziehbar sein.
Kritische Identitätsfehler blockieren die Veröffentlichung.
