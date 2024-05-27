
//const {servername} = require("../../config/server");  npm install -g browserify verwenden damit das funktioniert
import { getPostContainer } from "./builder.js";


const servername = "localhost:8080";

document.getElementById("post-text-button").addEventListener("click", createPost);
document.getElementById("post-text-field").addEventListener("keydown", checkInputField)

function createPost(){
    const textField = document.getElementById("post-text-field");
    const post = textField.value;
    
    if(post == ""){
        // show messsage
    }else{
        const url = `http://${servername}/blog/post/text`;

        const data = {
            post : post
        };
        fetch(url, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json' // Die Art des Inhalts, der gesendet wird
            },
            body: JSON.stringify(data) // Die Daten im JSON-Format
          })
          .then(response => {
            if (!response.ok) {
              // Wenn die Antwort keinen erfolgreichen Statuscode hat, werfen wir einen Fehler
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Die Antwort in ein JSON-Objekt umwandeln
          })
          .then(data => {
            console.log('Result:', data); // Erfolgreiche Antwort verarbeiten

            const article = (data.message == "error") ? document.createElement("p").innerHTML = "Something went wrong :/ ..." : getPostContainer("User", post);
            
            document.getElementById("post-field").append(article);
          })
          .catch(error => {
            console.error('There was a problem with your fetch operation:', error); // Fehlerbehandlung
          });

          textField.value = "";

    }
}

function checkInputField(event){
    const button = document.getElementById("post-text-button");
    if (event.key === 'Enter') {
        event.preventDefault(); // Verhindert das Standardverhalten des Formulars
        button.click(); // Trigger den Klick-Event des Buttons
      }
}

