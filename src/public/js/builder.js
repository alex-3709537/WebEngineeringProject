import { likeEvent } from "./postEventHandler.js";

export function getPostContainer(username, post) {
    try {
       
        if (post == undefined) {
            throw new Error("post undefined")
        }
        const divMain = document.createElement("div");
        const divUsername = document.createElement("div");
        const divMedia = document.createElement("div");
        const divText = document.createElement("div");
        const divHeader = document.createElement("div");
        const p = document.createElement("p");
        const divDate = document.createElement("div");
        


        divHeader.setAttribute("class", "flex-container-post-header");
        divDate.setAttribute("class", "flex-container-post-date");
        divMain.setAttribute("class", "flex-container-post");
        divUsername.setAttribute("class", "flex-container-post-username");
        divText.setAttribute("class", "flex-cantainer-post-input");

        divUsername.innerHTML = username;
        divHeader.appendChild(divUsername);

        divDate.innerHTML = getDate(post.date);
        divHeader.appendChild(divDate);
        divMain.appendChild(divHeader);

        if (post.data != undefined && post.data != "unknown-Content-Type") {
            divMedia.appendChild(post.data);
            divMain.appendChild(divMedia);
            
        }
        p.innerHTML = post.post;
        divText.appendChild(p);
        divMain.appendChild(divText);

        const divFooter = document.createElement("div");
        divFooter.setAttribute("class","post-footer");

        const likeContainer = createLikeDislikeElements(post.likes, post.dislikes, post.liked);
        likeContainer.setAttribute("id", post.pid);
        divFooter.appendChild(likeContainer);


  

        divMain.appendChild(divFooter);

        return divMain;
    } catch (err) {
        console.log(err);
    }
}

function getDate(date){
    const dn = new Date();
    const d = new Date(date);   

    var timeDiff = dn.getTime() - d.getTime();

    if(timeDiff < 0) timeDiff = 0; 

    var timeString;

    if((timeDiff / 1000) < 60){
        timeString = Math.floor(timeDiff / 1000) + " seks"
    }else if((timeDiff / 1000)/60 < 60 ){
        timeString = Math.floor((timeDiff / 1000)/60) + " mins"
    }else if(((timeDiff / 1000)/60)/60 < 24){
        timeString = Math.floor(((timeDiff / 1000)/60)/60) + " hrs"
    }else if((((timeDiff / 1000)/60)/60)/24 < 7){
        timeString = Math.floor((((timeDiff / 1000)/60)/60)/24) + " days"
    }else if(((((timeDiff / 1000)/60)/60)/24)/7 < 4){
        timeString = Math.floor(((((timeDiff / 1000)/60)/60)/24)/7) + " weeks"
    }else if((((((timeDiff / 1000)/60)/60)/24)/7)/4 < 12){
        timeString = Math.floor((((((timeDiff / 1000)/60)/60)/24)/7)/4) + " months"
    }else{
        timeString = Math.floor(((((((timeDiff / 1000)/60)/60)/24)/7)/4)/12) + " years"
    }

    
    //const dateString = `${hasZero(d.getDate())}.${hasZero(d.getMonth())}.${hasZero(d.getFullYear())} ${hasZero(d.getHours())}:${hasZero(d.getMinutes())}`;
    return timeString;



    function hasZero(date){
        if(date < 10){
            return "0" + date;
        }else{
            return date;
        }
    }
}

// Funktion zum Erstellen der Elemente
function createLikeDislikeElements(likecount, dislikecount, liked) {
    
    // Erstelle das übergeordnete div-Element
    const likeContainer = document.createElement('div');
    likeContainer.id = 'like-container';
    likeContainer.className = 'like-container';

    // Erstelle das Like-Checkbox-Element
    const likeCheckbox = document.createElement('input');
    likeCheckbox.type = 'checkbox';
    likeCheckbox.className = 'like-button';

    if(liked == 1) likeCheckbox.checked = true;

    likeCheckbox.addEventListener("click", likeEvent);

    // Erstelle das Like-Label-Element
    const likeLabel = document.createElement('label');
    likeLabel.htmlFor = 'like-button';
    likeLabel.textContent = '[LIKE]';

    // Erstelle das Like-Count-Element
    const likeCount = document.createElement('div');
    likeCount.className = 'like-count';
    likeCount.innerHTML = likecount;

    // Erstelle das Dislike-Checkbox-Element
    const dislikeCheckbox = document.createElement('input');
    dislikeCheckbox.type = 'checkbox';
    dislikeCheckbox.className = 'dislike-button';

    if(liked == 0) dislikeCheckbox.checked = true;

    dislikeCheckbox.addEventListener("click", likeEvent);

    // Erstelle das Dislike-Label-Element
    const dislikeLabel = document.createElement('label');
    dislikeLabel.htmlFor = 'dislike-button';
    dislikeLabel.textContent = '[DISLIKE]';

    // Erstelle das Dislike-Count-Element
    const dislikeCount = document.createElement('div');
    dislikeCount.className = 'dislike-count';
    dislikeCount.innerHTML = dislikecount;
    

    // Füge alle Elemente zum Container hinzu
    likeContainer.appendChild(likeCheckbox);
    likeContainer.appendChild(likeLabel);
    likeContainer.appendChild(likeCount);
    likeContainer.appendChild(dislikeCheckbox);
    likeContainer.appendChild(dislikeLabel);
    likeContainer.appendChild(dislikeCount);


    // Füge den Container zum Body hinzu
    return likeContainer;
}


