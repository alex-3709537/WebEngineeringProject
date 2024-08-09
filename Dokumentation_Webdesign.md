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

## 3. Grundlagen der Gestaltung

# Gesetz der Nähe

Beim Design der Website wurde dieses Gestaltgesetz etwa bei den Eingabefeldern (z.B. Anmeldeformular) verwendet, damit dieses als zusammengehörig wahrgenommen wird. Im CSS-Code wird dies durch das Gruppieren der Labels, Textboxen etc. innerhalb einer ".form-group" realisert.

# Gesetz der Ähnlichkeit

Bedienelemente haben einen einheitlichen Style (abgerundete Ecken, Padding, ...), wodurch diese als zusammengehörig erkannt werden (z.B. "Register" und "Login"-Buttons beim Anmeldeformular)

# Gesetz der Geschlossenheit

Es existieren Abgrenzungen, beispielsweise wird das obig beschriebene Post-Formular, "post-form", durch einen Rahmen sowie eine (leicht) andere Hintergrundfarbe klar vom Hintergrund der Website abgegrenzt.

# Gesetz der Symmetrie

Das Layout ist symmetrisch gestaltet, da bspw. die Anmelde- sowie Post-Formulare zentriert dargestellt werden.

# Gesetz der Figur-Grund-Beziehung

Das Formular hebt sich durch seine weiße Hintergrundfarbe und den Box-Schatten vom grauen Hintergrund ab, was es für den Benutzer leicht erkennbar macht. Das Formular wird dadurch als "Figur" wahrgenommen, während der Rest des Bildschirms als "Grund" dient.