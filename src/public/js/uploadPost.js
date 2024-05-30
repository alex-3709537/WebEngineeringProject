
//const {servername} = require("../../config/server");  npm install -g browserify verwenden damit das funktioniert
import { getPostContainer } from "./builder.js";
import { getUserInfo, setPost } from "./api.js";


document.getElementById("post-text-button").addEventListener("click", uploadPost);
document.getElementById("post-text-field").addEventListener("keydown", checkInputField)

async function uploadPost(){
  const textField = document.getElementById("post-text-field");
  const post = textField.value;

  const result = await setPost(post);
  const userInfo = await getUserInfo();

  console.log(result);
  
  const article = (result.message == "error") ? document.createElement("p").innerHTML = "Something went wrong :/ ..." : getPostContainer(userInfo.username, post);
            
  document.getElementById("post-field").append(article);
  textField.value = "";
}

function checkInputField(event){
    const button = document.getElementById("post-text-button");
    if (event.key === 'Enter') {
        event.preventDefault(); // Verhindert das Standardverhalten des Formulars
        button.click(); // Trigger den Klick-Event des Buttons
      }
}

