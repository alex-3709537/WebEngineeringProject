export function getPostContainer(username, post) {
    try {
        console.log("post: ", post);
        console.log(username)
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

        return divMain;
    } catch (err) {
        console.log(err.message);
    }
}

function getDate(date){
    const d = new Date(date);
    const dn = new Date();

    const timeDiff = dn.getTime() - d.getTime();
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