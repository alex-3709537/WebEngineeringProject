import { getUserByUID, getUserInfo, getUserPostCount, getUserPosts } from "./api.js";
import { getPostContainer } from "./builder.js";


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

window.onload = async function() 
{
    const currentUser = await getUserInfo();
    console.log(currentUser);

    //bisherige User-Posts reinladen
    buildPostTimeline(currentUser);

    //automatisches Überprüfen auf neue Posts beginnen
    startAutoFetchRoutine(currentUser.uid);
};



async function buildPostTimeline(currentUser)
{
    //maximal 20 posts eines Users laden
    const posts = await getUserPosts(currentUser.uid, 20);
    const postObj = JSON.parse(posts);
    console.log(postObj);


    //usernames cachen, um nichrt für jeden post den zugehörigen usernamen anfragen zu müssen
    var knownUserNames = [];
    console.log("KnownUserNameCount: " + knownUserNames.length);


    //zurückgegebene Anzahl an Posts in HTML Container packen und anzeigen
    for (var i = 0; i < postObj.length; ++i)
    {
        //versuchen, username aus cache zu holen
        var userName;
        const userObj = knownUserNames.find(knownUser => knownUser.uid === postObj[i].uid);

        if (userObj)
        {
            userName = userObj.username;
        }
        else //username nicht gecached
        {
            console.log("Requesting username for " + postObj[i].uid + "...");
            const res = await getUserByUID(postObj[i].uid);

            userName = res.username;
            knownUserNames.push({username: res.username, uid: postObj[i].uid});
        }
    //    console.log("KnownUserNameCount: " + knownUserNames.length);

        const article = getPostContainer(userName, postObj[i].post);
        console.log(postObj[i]);
        document.getElementById("post-field").append(article);
    }


}



async function startAutoFetchRoutine(uid)
{
    var oldData = -1;
    var fetchedData = await getUserPostCount(uid);
    while (true)
    {
     /*   if (fetchedData.state == "success")
            console.log("User id #" + uid + " has currently " + fetchedData.count + " posts!");
        else
            console.log("error"); */

        oldData = fetchedData.count;
        fetchedData = await getUserPostCount(uid);

        await sleep(2000);
    }
}