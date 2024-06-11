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
        const p = document.createElement("p");

        divMain.setAttribute("class", "flex-container-post");
        divUsername.setAttribute("class", "flex-container-post-header");
        divText.setAttribute("class", "flex-cantainer-post-input");

        divUsername.innerHTML = username;
        divMain.appendChild(divUsername);

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