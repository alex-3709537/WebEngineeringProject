# Dokumentation

## Installationsanleitung
build.bat für Windows ausführen oder build_unix.sh für Linux oder macOS.

## Projektstruktur
Die Struktur orientiert sich an dem MVC Prinzip.

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

Implementation des AutoFetch-Features zum automatischen Nachladen von neuen, sowie vergangenen Posts im Hintergrund, was kein manuelles Neuladen der Seite erfordert.
Als Frontend-Leistung werden dabei...
a) Posts, welche von Anderen erstellt wurden, während man selbst gerade aktiv ist, oben eingefügt und deren Inhalt (Text, Bild, Video) dargestellt.
b) Ältere Posts unten eingefügt, wobei durch herunterscrollen weitere ältere Posts geladen werden können (Infinity-Scroll).
Der Code dafür findet sich in der src\public\js\autoFetch.js-Datei.

Die src/controller/autoFetchController.js-Datei enthält die Middlewares und beinhaltet das Error Handling, da die Methoden dieser Datei für das Tätigen von Requests verwendet werden. Zudem befindet sich hier der Teil des Backend-Codes, welcher für dieses Feature spezifische SQL-Anfragen aus der /src/model/mySqlHandler.js-Datei aufruft (nämlich:  getPostCountForUID, getPostsForUID, getPostsByUids, getAllUsers, getPostCountForUIDs) und deren result an das FrontEnd weiterdelegiert.

Zugrunde liegende Ideen dieser Implementation waren, dass das Laden von neuen bzw. alten Posts ohne zutun des Users automatisch im Hintegrund geschehen soll, weshalb im Frontend alle zwei Sekunden in der startAutoFetchRoutine()-Methode eine Anfrage für die Anzahl der Posts für die spezifizierten UIDs gestellt wird, welche mit lokal pro User gecachten Werten verglichen wird und bei einer Änderung die Differenz von der neuen und der gespeicherten Anzahl von Posts für diesen User nachgeladen ubnd anschließend eingefügt wird. Dieser Feature funktioniert geräteübergreifend (wenn User A einen Post erstellt, wird dieser automatisch bei User B gefetched und angezeigt, sofern dieser die Posts von User A empfangen will (d.h. wenn die UID von User B in dem Array an zu überwachenden UIDs ist oder dieses -1 ist (alle Posts laden))).

Weitegehend wurde während des Entwicklungsvorgangs dieses Features die Entscheidung getroffen, die Anzahl der benötigten Requests während des Ladevorgangs der initial angezeigten Timeline möglichst gering zu halten, wodurch unter anderem das lokale Caching der zu UIDs zugehörigen Usernames beim initalen Laden der Timeline in der buildPostTimeline()-Funktion entstand.

Das Einfügen von Posts oben bzw unten von der Timeline wird durch das Differenzieren anhand des Creation Date eines Posts vorgenommen, wobei geringfügige Zusatzmaßnahmen benötigt werden, um die Korrektheit der erstellten Logik auch bei hohen Serverladezeiten etc. zu gewährleisten; genaueres hierzu in der Dokumentation der fetchLastNPosts-Methode, welche das Laden von jeglichen Posts übernimmt.



### Sebastian Albert Matrikelnummer: 4343734
Ich musste die Funktion Freunde hinzufügen und Freunde anzeigen entwickeln. Wir entwickeln einen Blog und da ist es üblich, dass man Freunde hinzufügen kann. Deswegen darf die Methode bei unserem Blog nicht fehlen. 

In einem dynamischen Dropdown menu werden alle user angezeigt. Wenn man einen user ausgewählt hat, dann kann man auf den Button AddFriend drücken. Der Freundename und die user ID des angemeldeten user wird in die Datenbank hochgeladen. Das dynamische Dropdown menu und der Button AddFriend steht in der Datei home.ejs. Die Programmierbare Logik zu den dynamischen Dropdown menu und dem Button AddFriend steht in der Datei friendslist.js. Die Verknüpfung zwischen dem Model und der View passiert im Controller. In meinem Fall in der Datei friendController.js. Im Model in der Datei mysqlHandler.js gibt es die Methode addFriend, die die uid und der friendname in die Datenbank Tabelle friends ladet.


Ich wollte noch programmieren das man die Freunde die ein bestimmter Benutzer hinzugefügt hat, in eine dynamischen Liste ausgibt. Das habe ich leider zeitlich nicht mehr geschafft. Die Logik hierzu habe ich zwar entwickelt, aber beim Ausführen kommt eine Fehlermeldung. Deshalb habe ich die dynamische Liste in der Datei home.ejs wieder rausgelöscht. Im Model in der Datei mysqlHandler.js gibt es die Methode getFriendsByUserId, die Freundenamen die der angemeldete Benutzer als Freund ausgewählt hat holt. Im Controller in der Datei friendController.js ist wieder die Verknüpfung zwischen View und Model. Es gibt dort die Methode listFriends, die die uid der Methode getFriendByUserId im Model in der Datei mysqlHandler.js übergibt. Die Methode listFriends erhaltet die Freunde von dem Benutzer der sich angemeldet hat in dem Objekt friends. Die dynamische Liste wie oben bereits erwähnt wurde gelöscht, da sonst die Webseite nicht angezeigt wird. Das Objekt friends wird eigentlich hier aufgerufen, um die dynamische Liste auf der Webseite zu erzeugen. Ich habe noch eine routes Datei erstellt, nämlich in der Datei friend.js und ich habe noch die index.js überarbeitet. In der index.js Datei refferenzieren die Pfade auf die routes Datei friend.js und auf die controller Datei friendController.js. In der routes Datei friend.js refferenzieren die Pfade auf die Controller Datei friendController.js.


### Alexander Fleig

https://github.com/lukaspanni/Lecture_Webengineering_2024/blob/main/Material/Notes/Bewertung_Projektarbeit.md