# Web Engineering Project

## Installationen und Packages

### Node Version manager und Node js isntallieren + package manager

1. NVM installieren:
	https://github.com/coreybutler/nvm-windows/releases -> nvm-setup.exe installieren und ausführen
	mit `nvm -v` prüfen ob installation erfolgreich
2. Nodejs über nvm installieren:
	`nvm install --lts`
3. node version nutzen
	`nvm list` -> listet die installierten node versionen
	`nvm use <version>`  (20.12.2)
	mit `node --version` überprüfen
4. npm im projekt Ordner installieren
	`npm init`

### Zusätzliche Packages

1. Express.js im Projektordner installieren 
	`npm install --save express`

2. ejs installieren (erlaubt dynamische HTML Formulare)
	`npm install ejs`

3. install cookie parster
	`npm install cookie-parser`

4. install session manager
	`npm install express-session`

5. install mysql
	`npm install mysql`

6. install multer for handling multipart/form-data
	`npm install multer`
7. install mysql2 
	`npm install mysql2`
8. install multer sharp
	`npm install multer sharp`


## Dokumentation

Doku express nodejs:
	https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction

MVC Strukture example
	https://github.com/sdthaker/Node.js-MVC-App/blob/master/controllers/loginController.js

Datenbank auf azure erstellen
	https://learn.microsoft.com/de-de/azure/azure-sql/database/single-database-create-quickstart?view=azuresql&tabs=azure-portal

mit Node js auf azure Datenbank zugreifen
    https://learn.microsoft.com/de-de/azure/azure-sql/database/connect-query-nodejs?view=azuresql&tabs=windows

Datenbak feld typen 
	https://www.w3schools.com/sql/sql_datatypes.asp

GIT 
	https://www.youtube.com/watch?v=mJ-qvsxPHpY

## Roadmap
 - [x] Project in repository hochladen sodass jeder zugriff hat und arbeiten kann
 - [x] Jeder Zugriff auf Azure Datenbank
 - [x] Alle auf Gleichen Stand (MVC, frameworks)
 - [ ] Name von Website überlegen 
 - [x] Datenbank Struktur überlegen (Grob) 
 - [x] Überblick über Projektmanagement Aufgabe verschaffen

 - [x] Erste Text Posts schreiben (Alex)
 - [x] Bilder und Videos hochladen (Alex)
 - [x] Datum anzeigen und Likes Funktion hinzufügen (Alex)
 - [x] Feed immer im Hintergrund aktualisieren und neue Posts suchen (Lukas)
 - [ ] Freunde adden und Freundesliste anzeigen (Sebastian)


## Features
 - [x] Accounts anlegen
 - [x] Posts hochladen (Text, Bilder, Videos) 
 - [ ] Andere Nutzer adden
 - [ ] Private Accounts
 - [x] Recent Posts anzeigen
 - [ ] Nur Posts von Freunden anzeigen
 - [x] Liken und kommentieren
 - [ ] Inhalte löschen und editieren
 
 