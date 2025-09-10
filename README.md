# SinageSystem

## Projekt-Setup und Entwicklung

### 1. Repository klonen

Lade das Projekt von GitHub herunter:

git clone https://github.com/AlGokk/sinagesystem.git


### 2. Abhängigkeiten installieren

Wechsle in das Projektverzeichnis und installiere alle notwendigen Pakete:

npm install (wichtig, auf deinem Computer musst du Node.js, NPM installiert sein, hier ist eine Anleitung https://medium.com/@littlecodingthings/how-to-install-npm-on-macos-039b77e37244)


### 3. .env-Dateien erstellen

Erstelle im Root-Verzeichnis und im `backend`-Ordner eine Datei `.env` mit folgendem Inhalt:

MONGODB_URI=mongodb+srv://<db>:<pw>@cluster0.xedlb3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


> **Hinweis:** Ersetze `<db>` und `<pw>` mit dem Datenbanknamen und Passwort. Diese Informationen bekommst Du vom Administrator.

### 4. Entwicklungsmodus starten

Starte den Entwicklungsserver mit:

npm run dev


Dadurch wird der Backend-Server gestartet, der sich mit der MongoDB-Datenbank verbindet, und die Webseite wird geöffnet, auf der die Preisliste angezeigt wird.

Du kannst in deinem Browser die Seite unter folgender Seite http://localhost:3000 aufrufen.

---


