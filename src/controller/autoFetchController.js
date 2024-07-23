const {
    getPostCountForUID,
    getPostsForUID,
    getPostsByUids,
    getAllUsers,
    getPostCountForUIDs,
} = require("../model/mysqlHandler");

const fetchPostCountForUID = async (req, res) =>{

    const result = await getPostCountForUID(req.session.user.uid);

    if(result == "err"){
        res.status(result == undefined || result === undefined || result === "err" ? 500 : 200).json({ uid: req.session.user.uid, state: "error", count: 0});
    }else{
        res.status(result == undefined || result === undefined || result === "err" ? 500 : 200).json({ uid: req.session.user.uid, state: "success", count: result});
    }
}

const fetchPostCountForUIDs = async (req, res) =>{

    const result = await getPostCountForUIDs(req.query.uids);

    if(result == "err"){
        res.status(result == undefined || result === undefined || result === "err" ? 500 : 200).json({ uid: req.session.user.uid, state: "error", count: 0});
    }else{
        res.status(result == undefined || result === undefined || result === "err" ? 500 : 200).json({ uid: req.session.user.uid, state: "success", count: result});
    }
}

const fetchPostsForUID = async (req, res) =>{

    const result = await getPostsForUID(req.session.user.uid, req.query.maxAmountOfReturnedPosts);
    res.status(result == undefined || result === undefined || result === "err" ? 500 : 200).json(JSON.stringify(result));
}

const fetchAllUsers = async (req, res) =>{

    const result = await getAllUsers();
    res.status(result == undefined || result === undefined || result === "err" ? 500 : 200).json(result);
}

const fetchPostsForUIDs = async (req, res) =>{

    const result = await getPostsByUids(req.query.uid, req.query.maxAmountOfReturnedPosts, req.query.lastLoadedPostCreationDate);
    res.status(result == undefined || result === undefined || result === "err" ? 500 : 200).json(result);
}

module.exports = {
    fetchPostCountForUID,
    fetchPostCountForUIDs,
    fetchPostsForUID,
    fetchPostsForUIDs,
    fetchAllUsers
}