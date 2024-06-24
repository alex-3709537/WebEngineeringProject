import { getUserByUID, getUserInfo, getUserPostCount, getUserPostPids, getFullPost, getAllUserInfo, getPostCountForUIDs } from "./api.js";
import { getPostContainer } from "./builder.js";


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

window.onload = async function() 
{
    const currentUser = await getUserInfo();
    console.log(currentUser);

    //bisherige User-Posts von allen Usern (-1) reinladen
    buildPostTimeline(-1, 10);

    const users = await getAllUserInfo();

    const monitoredUIDs = [];
    monitoredUIDs.push(users.map(user => user.uid));
    
    console.log("Monitored UIDs: " + JSON.stringify(monitoredUIDs));

    //automatisches Überprüfen auf neue Posts beginnen
    startAutoFetchRoutine(monitoredUIDs);


    
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
        document.getElementById("post-field").prepend(article);
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

/**
 * @param {Number[]} uid Ein Array, welches alle UIDs enthält, für die posts geladen werden sollen. Um Posts von allen Nutzern zu laden, kann für diesen Parameter -1 übergeben werden.
 * @returns 
 */
async function startAutoFetchRoutine(uids)
{
    var oldData;
    console.log("idk: " + JSON.stringify(uids));
    var fetchedData = await getPostCountForUIDs(uids);
    console.log("fetched post count: " + fetchedData.count);

    while (true)
    {
        oldData = fetchedData.count;
        fetchedData = await getPostCountForUIDs(uids);

        console.log("o:" + oldData);
        console.log("n:" + fetchedData.count);

        if (+oldData != +fetchedData.count)
        {
            console.log("Fetching " + (+fetchedData.count - +oldData) + " new posts...");

            fetchLastNPosts(uids, +fetchedData.count - +oldData);
        }

        await sleep(2000);
    }
}