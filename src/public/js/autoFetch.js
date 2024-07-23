import { getUserByUID, getUserInfo, getUserPostCount, getUserPostPids, getFullPost, getAllUserInfo, getPostCountForUIDs } from "./api.js";
import { getPostContainer } from "./builder.js";


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


var knownUserNames = [];
var monitoredUIDs = [];
const maxAmountOfPostsToBeFetchedAtATime = 10;
var postsContainer;

//nur Posts nachladen, die älter als lastLoadedPostCreationDate sind (initial die aktuelle Zeit)
var lastLoadedPostCreationDate;


document.addEventListener('DOMContentLoaded', () => 
{
    postsContainer = document.getElementById("posts");
    postsContainer.addEventListener('scroll', handleScroll);
});


window.onload = async function() 
{
    lastLoadedPostCreationDate = new Date().toISOString();

    const currentUser = await getUserInfo();
    

    //bisherige User Posts von allen Usern (-1) reinladen
    buildPostTimeline(-1, maxAmountOfPostsToBeFetchedAtATime, lastLoadedPostCreationDate);

    const users = await getAllUserInfo();

    monitoredUIDs.push(users.map(user => user.uid));
    
    console.log("Monitored UIDs: " + JSON.stringify(monitoredUIDs));

    //automatisches Überprüfen auf neue Posts beginnen
    startAutoFetchRoutine(monitoredUIDs);
};


//ältere posts automatisch nachladen, sobald User 80% der seite nach unten gescrollt hat

const handleScroll = () => 
{
    const { scrollTop, scrollHeight, clientHeight } = postsContainer;
        if (scrollTop + clientHeight >= scrollHeight * 0.8) {
            postsContainer.removeEventListener('scroll', handleScroll);
            fetchLastNPosts(monitoredUIDs, maxAmountOfPostsToBeFetchedAtATime, lastLoadedPostCreationDate, true).then(() => 
            {
                console.log("posts nachgeladen!");
                postsContainer.addEventListener('scroll', handleScroll);
            });
        }
}



async function fetchLastNPosts(users, maxAmountOfPostsToBeFetched, lastLoadedDate, setLastDate)
{
    //pids laden (das lastLoadedDate muss etwas in die zukunft verschoben werden, wenn der benutzer einen neuen post erstellt, da die verbindung zum server, um diesen dort abzuholen bissel zeit braucht...)
    const pids = await getUserPostPids(users, maxAmountOfPostsToBeFetched, setLastDate === true ? lastLoadedDate : new Date(new Date().setTime(new Date().getTime() + 60 * 60 * 1000 * 24)).toISOString());
   

    for(let i = 0; i < pids.length; i++)
    {
        
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

        // nur bei älteren posts muss dieses datum weiter nach hinten gesetzt werden; bei neu erstellten posts darf es nicht verändert werden!
        if (setLastDate)
        {
            //sicherstellen, dass das älteste datum der geladenen posts erwischt wird
            const postDate = new Date(post.date).toISOString();
            lastLoadedPostCreationDate = postDate < lastLoadedDate ? postDate : lastLoadedDate;
        }

        const article = getPostContainer(userName, post);  

        if (setLastDate === true)
            document.getElementById("post-field").append(article); //alte posts werden unten angehängt
        else
            document.getElementById("post-field").prepend(article); //neue posts werden oben angehängt
    }
}

/**
 * Methode kann genutzt werden um die Timeline eines Users zu erstellen.
 * 
 * @param {Number[]} usersToBeIncluded Ein Array, welches alle UIDs enthält, für die posts geladen werden sollen. Um Posts von allen Nutzern zu laden, kann für diesen Parameter -1 übergeben werden.
 * @param {Number} maxAmountOfPostsToBeFetchedAtATime //Die (maximale) Anzahl von Posts, welche auf einmal nachgeladen werden. 10 ist der Defaultwert.
 * @param {Date} lastLoadedPostCreationDate //Die Zeit, ab welcher ältere Posts als diese geladen werden
 */
export const buildPostTimeline = async (usersToBeIncluded, maxAmountOfPostsToBeFetchedAtATime, lastLoadedPostCreationDate) =>
{
    fetchLastNPosts(usersToBeIncluded, maxAmountOfPostsToBeFetchedAtATime, lastLoadedPostCreationDate, true);
}

/**
 * @param {Number[]} uid Ein Array, welches alle UIDs enthält, für die posts geladen werden sollen. Um Posts von allen Nutzern zu laden, kann für diesen Parameter -1 übergeben werden.
 * @returns 
 */
async function startAutoFetchRoutine(uids)
{
    var oldData;
    var fetchedData = await getPostCountForUIDs(uids);

    while (true)
    {
        oldData = fetchedData.count;
        fetchedData = await getPostCountForUIDs(uids);

        if (+oldData != +fetchedData.count)
        {
            console.log("Fetching " + (+fetchedData.count - +oldData) + " new posts for uids " + uids);
            fetchLastNPosts(uids, +fetchedData.count - +oldData, new Date(new Date().setTime(new Date().getTime() + 60 * 60 * 1000)).toISOString(), false); //hier wird NICHT lastLoadedPostCreationDate übergeben, da der post aktueller sein wird!
        }

        await sleep(2000);
    }
}