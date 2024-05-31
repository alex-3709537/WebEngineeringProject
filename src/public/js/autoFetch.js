import { getUserInfo, getUserPostCount, getUserPosts } from "./api.js";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

window.onload = async function() 
{
    const currentUser = await getUserInfo();
    console.log(currentUser);

    //bisherige User-Posts reinladen
    getUserPosts(currentUser.uid, 50);

    startAutoFetchRoutine(currentUser.uid);
};


async function startAutoFetchRoutine(uid)
{
    var oldData = -1;
    var fetchedData = await getUserPostCount(uid);
    while (true)
    {
        if (fetchedData.state == "success")
            console.log("User id #" + uid + " has currently " + fetchedData.count + " posts!");
        else
            console.log("error");

        oldData = fetchedData.count;
        fetchedData = await getUserPostCount(uid);

        await sleep(2000);
    }
}