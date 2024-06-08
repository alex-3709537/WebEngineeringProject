export function getPostContainer(username, post) {
    try {


        if (post == undefined) {
            throw new Error("post undefined")
        }
        const divMain = document.createElement("div");
        const divUsername = document.createElement("div");
        const divMedia = document.createElement("div");
        const divText = document.createElement("div");

        divMain.setAttribute("class", "flex-container-post");
        divUsername.setAttribute("class", "flex-container-post-header");
        divText.setAttribute("class", "flex-cantainer-post-input");

        divUsername.innerHTML = username;
        divMain.appendChild(divUsername);

        if (post.media != undefined) {
            divMedia.appendChild(post.media);
            divMain.appendChild(divMedia);
            console.log(post.media);
        }

        divText.appendChild(post.text);
        divMain.appendChild(divText);

        return divMain;
    } catch (err) {
        console.log(err.message);
    }
}