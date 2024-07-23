# Webdesign

## 1. Formularelemente
`<form id="post-form" method="post">
    <div id="text-post-field-button-container">
        <div id="text-post-field-info"></div>
        <input type="text" id="post-text-field" name="text_input">
        <input id="post-text-button" type="submit" value="send" name="upload_button">
        <input type="file" id="file-input" name="file_input" accept="video/mp4,image/jpg, image/png">
    </div>
    <div id="friends-list-add-friends-container">
        <label for="friends">add friends:</label>
        <select name="friends" id="friends">
        </select>
    </div>
</form>`

Dieses Formular ermöglicht es den Benutzern, Text- und Dateieingaben zu machen und diese abzuschicken. Es enthält:

- Ein Textfeld (input type="text") zur Eingabe von Text.
- Ein Dateiupload-Feld (input type="file") zum Hochladen von Bildern oder Videos.
- Ein Auswahlfeld (select) zur Auswahl von Freunden.

Diese Elemente verbessern die Benutzerinteraktion und ermöglichen es den Benutzern, Inhalte zu erstellen und zu teilen, was das Engagement auf der Webseite erhöht.

## 2. Flexbox

Zusätzlich verwendet der div-Container Flexbox, um die Anordnung der Elemente zu steuern, was zu einer flexiblen und anpassungsfähigen Gestaltung führt. Flexbox ermöglicht es, die Ausrichtung, Reihenfolge und Verteilung der Elemente innerhalb des Containers einfach zu steuern, was besonders nützlich für responsive Layouts ist.