
import { getPostContainer } from "./builder.js";
import { getUserInfo, setPost, getFullPost} from "./api.js";


const postField = document.getElementById("post-text-field");


document.getElementById("post-form").addEventListener("submit", async function(event) {
  event.preventDefault(); // Verhindert das Standardverhalten (Seiten-Reload);
  const form = event.target;

  if ((postField.value === undefined || postField.value === null || postField.value === "" || postField.value.trim() === "" || postField.value === "Enter a text to post!") && document.getElementById("file-input").value === "")
  {
    postField.value = "Enter a text to post!";
  }
  else
  {
    const result = await setPost(form);

    postField.value = "";
    document.getElementById("file-input").value = "";
      
    const post = await getFullPost(result.pid);
    const div = getPostContainer(result.username, post);
    document.getElementById("post-field").append(div);
  }
  
});

