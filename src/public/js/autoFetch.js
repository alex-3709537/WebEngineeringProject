import { getUserByUID, getUserInfo, getUserPostCount, getUserPostPids, getFullPost } from "./api.js";
import { getPostContainer } from "./builder.js";


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

window.onload = async function() 
{
    const currentUser = await getUserInfo();
    console.log(currentUser);

    //bisherige User-Posts von allen Usern (-1) reinladen
    buildPostTimeline(-1, 10);

    //automatisches Überprüfen auf neue Posts beginnen
    startAutoFetchRoutine(currentUser.uid);
};




var knownUserNames = [];


async function fetchLastNPosts(users, maxAmountOfPostsToBeFetched)
{
    //pids laden
    const pids = await getUserPostPids(users, maxAmountOfPostsToBeFetched);

    for(let i = pids.length - 1; i >= 0; i--)
    {
        console.log("Fetching post for pid " + pids[i].pid);
        let post = await getFullPost(pids[i].pid);

        //versuchen, username aus cache zu holen
        var userName;
        const userObj = knownUserNames.find(knownUser => knownUser.uid === post.uid);
    
        if (userObj)
        {
            userName = userObj.username;
        }
        else //username nicht gecached
        {
            console.log("Requesting username for UID #" + post.uid + "...");
            const res = await getUserByUID(post.uid);

            userName = res.username;
            knownUserNames.push({username: res.username, uid: post.uid});
        }

        const article = getPostContainer(userName, post);     
        document.getElementById("post-field").append(article);
    }
}

/**
 * Methode kann genutzt werden um die Timeline eines Users zu erstellen.
 * 
 * @param {Number[]} usersToBeIncluded Ein Array, welches alle UIDs enthält, für die posts geladen werden sollen. Um Posts von allen Nutzern zu laden, kann für diesen Parameter -1 übergeben werden.
 * @param {Number} maxAmountOfPostsToBeFetchedAtATime //Die (maximale) Anzahl von Posts, welche auf einmal nachgeladen werden. 10 ist der Defaultwert.
 * @returns 
 */
export const buildPostTimeline = async (usersToBeIncluded, maxAmountOfPostsToBeFetchedAtATime) =>
{
    fetchLastNPosts(usersToBeIncluded, maxAmountOfPostsToBeFetchedAtATime);
    //TODO: posts nachladen, nachdem das Ende der initial geladenen posts erreicht wurde
}


async function startAutoFetchRoutine(uid)
{
    var oldData = -1;
    var fetchedData = await getUserPostCount(uid);
    while (true)
    {
        oldData = fetchedData.count;
        fetchedData = await getUserPostCount(uid);

        await sleep(2000);
    }
}