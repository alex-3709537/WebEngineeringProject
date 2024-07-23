# Dokumentation

## Installationsanleitung
build.bat für Windows ausführen oder build_unix.sh für Linux oder IOS.

## Projektstruktur
Die Struktur orientiert sich an dem MVC Prinziep.

### public
- **js**: Hier befinden sich alle JavaScript-Dateien, die für das Frontend bestimmt sind.
- **css**: Hier befinden sich alle CSS-Dateien, die das Styling der Webseite regeln.
- **html**: Hier befinden sich statische HTML-Dateien, falls solche verwendet werden. Meistens werden diese jedoch durch die EJS-Dateien im View-Ordner ersetzt.

### config
- In diesem Ordner liegen alle Konfigurationsdateien, die für die Anwendung benötigt werden. Dies könnten z.B. Datenbankkonfigurationen, Umgebungsvariablen oder andere anwendungsspezifische Einstellungen sein.

### routes
- Dieser Ordner enthält alle Router-Dateien, die die verschiedenen Endpunkte der Anwendung definieren. Hier werden die Routen für HTTP-Anfragen definiert und die entsprechenden Controller aufgerufen.

### views
- Hier befinden sich die EJS-Dateien (Embedded JavaScript), die für die Darstellung der dynamischen Inhalte auf der Webseite verantwortlich sind. Diese Dateien kombinieren HTML mit JavaScript, um dynamische Webseiten zu erstellen.

### controllers
- In diesem Ordner liegen die Controller-Dateien, die die Logik der Anwendung enthalten. Sie verarbeiten die eingehenden Anfragen, interagieren mit den Modellen und wählen die entsprechenden Views aus, um die Antworten zurückzugeben.

### models
- Dieser Ordner enthält die Model-Dateien, die die Datenstrukturen und Geschäftslogik definieren. Hier wird die Interaktion mit der Datenbank gehandhabt.

### app.js
- Dies ist die zentrale Datei, die den Express-Server konfiguriert und startet. Hier werden alle Middleware, Routen und sonstige Einstellungen der Anwendung definiert.

## Erklärung der grundsätzlichen Struktur

### Frontend-Code
- **public/js**: Hier wird der JavaScript-Code abgelegt, der im Browser ausgeführt wird.
- **public/css**: Hier wird das Styling der Webseite definiert.
- **public/html**: Enthält statische HTML-Dateien (wenn verwendet).
- **views**: Enthält die EJS-Dateien, die für das Rendern der dynamischen HTML-Seiten zuständig sind.

### Backend-Code
- **routes**: Enthält die Definitionen der Endpunkte der Anwendung.
- **controllers**: Enthält die Logik für die Verarbeitung der Anfragen und die Auswahl der Views.
- **models**: Enthält die Definitionen der Datenstrukturen und Geschäftslogik.
- **config**: Enthält Konfigurationsdateien für die Anwendung.
- **index.js**: Startet und konfiguriert den Express-Server.

### Externe Bibliotheken/Frameworks
- **Express**: Ein minimalistisches Webframework für Node.js, das für den Aufbau des Servers und das Routing verwendet wird.
- **EJS**: Eine Template-Engine, die es ermöglicht, HTML mit eingebettetem JavaScript zu verwenden, um dynamische Webseiten zu erstellen.
- **cookie-parser**: Middleware zur Verarbeitung von Cookies.
- **express-session**: Middleware zur Verwaltung von Sitzungen.
- **mysql**: MySQL-Datenbank-Client.
- **mysql2**: Ein schnellerer und modernerer MySQL-Client.
- **multer**: Middleware zur Verarbeitung von Datei-Uploads.
- **sharp**: Ein Hochleistungs-Bildverarbeitungsmodul.

## Dokumentation Eigenleistung

### Lukas Scharnweber

### Sebastian Albert

### Alexander Fleig

https://github.com/lukaspanni/Lecture_Webengineering_2024/blob/main/Material/Notes/Bewertung_Projektarbeit.md