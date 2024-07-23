
import { getPostContainer } from "./builder.js";
import { getUserInfo, setPost, getFullPost, changeLike} from "./api.js";


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
      
  /*  const post = await getFullPost(result.pid);
    const div = getPostContainer(result.username, post);
    document.getElementById("post-field").append(div); */
  }
  
});


export async function likeEvent(event){
  const element = event.target;
  const parentElement = element.parentElement;
  const pid = element.parentElement.id;
  
  var result = {};

  const likeButton = parentElement.querySelector(".like-button");
  const dislkieButton = parentElement.querySelector(".dislike-button");
  

  const likeIsChecked = likeButton.checked;
  const dislikeIsChecked = dislkieButton.checked;

  if(element.className == "like-button"){

    if(!likeIsChecked && !dislikeIsChecked){
      increaseLike(parentElement, -1);
      result = await changeLike(pid, 1);
      
    }else if(likeIsChecked && dislikeIsChecked){
      dislkieButton.checked = false;
      increaseDislike(parentElement, -1);
      increaseLike(parentElement, 1)
      result= await changeLike(pid, 1)
    }else if(likeIsChecked && !dislikeIsChecked){
      increaseLike(parentElement, 1);
      result = await changeLike(pid, 1);
    }

  }else{
    if(!likeIsChecked && !dislikeIsChecked){
      increaseDislike(parentElement, -1);
      result = await changeLike(pid, 0);
      
    }else if(likeIsChecked && dislikeIsChecked){
      likeButton.checked = false;
      increaseDislike(parentElement, 1);
      increaseLike(parentElement, -1)
      result= await changeLike(pid, 0)
    }else if(!likeIsChecked && dislikeIsChecked){
      increaseDislike(parentElement, 1);
      result = await changeLike(pid, 0);
    }
  }
  
  

  return result;


  function increaseLike(parentElement, d){
       
    const likeCounter = parentElement.querySelector(".like-count");
    const number = likeCounter.innerHTML;
    likeCounter.innerHTML = parseInt(number) + d;
    
  }

  function increaseDislike(parentElement, d){
    
    const dislikeCounter = parentElement.querySelector(".dislike-count");
    const number = dislikeCounter.innerHTML;
    dislikeCounter.innerHTML = parseInt(number) + d;
  }
  
}
