import { getUserInfo, getUserPostCount } from "./api.js";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

window.onload = async function() 
{
    const currentUser = await getUserInfo();
    console.log(currentUser);

    startAutoFetchRoutine(currentUser.uid);
};


async function startAutoFetchRoutine(uid)
{
    const oldPostCount = -1;
    const fetchedPostCount = await getUserPostCount(uid);
    while (true)
    {
        console.log("User id #" + uid + " has currently " + fetchedPostCount + " posts!");
        oldPostCount = fetchedPostCount;
        fetchedPostCount = await getUserPostCount(uid);
        console.log("fetched new post count for user #" + uid);
        await sleep(2000);
    }
}