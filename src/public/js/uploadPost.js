
import { getPostContainer2 } from "./builder.js";
import { getUserInfo, setPost, getFullPost} from "./api.js";


const postField = document.getElementById("post-text-field");


document.getElementById("post-form").addEventListener("submit", async function(event) {
  event.preventDefault(); // Verhindert das Standardverhalten (Seiten-Reload);
  const form = event.target;
  const formData = new FormData(form);

  const result = await setPost(formData);

  postField.value = "";
  document.getElementById("file-input").value = "";

  const post = await getFullPost(result.pid);
  const div = getPostContainer2(result.username, post);
  document.getElementById("post-field").append(div);
  
});

