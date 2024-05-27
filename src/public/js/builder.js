export function getPostContainer(username, postText){
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");

    article.setAttribute("class", "post-container-article");
    h2.setAttribute("class", "post-container-username");
    p.setAttribute("id", "post-container-text");

    h2.innerHTML = username;
    p.innerHTML = postText;
    article.append(h2);
    article.append(p);

    return article;
}