# Import-Pipeline

Die produktive Datenbank entsteht reproduzierbar aus den Rohquellen.

1. Roharchive unverändert sichern.
2. Dateien inventarisieren und technische Duplikate ausschließen.
3. Quellzeilen mit stabiler source_record_id versehen.
4. Werte normalisieren, Originalwerte behalten.
5. Spieler anhand Passnummer/Spieler-ID/name+club reconciliieren.
6. Vereine und Landesverbände kanonisieren.
7. Turniere aus Ergebnisquellen bilden.
8. Ergebnisse und Runden über stabile IDs verbinden.
9. DRL-Aufnahmen als eigene Historientabelle importieren.
10. DMV-Teilnahmen/Ergebnisse als eigene Quellrecords importieren.
11. Fremdschlüssel- und Identitätsaudit ausführen.
12. Nur geprüfte Daten für die Weboberfläche veröffentlichen.

Ein Rebuild muss jederzeit aus den Rohquellen reproduzierbar sein.
