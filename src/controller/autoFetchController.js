const {
    getPostCountForUID,
    getPostsForUID,
    getPostsByUids
} = require("../model/mysqlHandler");

const fetchPostCountForUID = async (req, res) =>{

    const result = await getPostCountForUID(req.session.user.uid);

    if(result == "err"){
        res.json({ uid: req.session.user.uid, state: "error", count: 0});
    }else{
        res.json({ uid: req.session.user.uid, state: "success", count: result});
    }
}

const fetchPostsForUID = async (req, res) =>{

    const result = await getPostsForUID(req.session.user.uid, req.query.maxAmountOfReturnedPosts);
    res.json(JSON.stringify(result));
}

const fetchPostsForUIDs = async (req, res) =>{

    console.log("Fetching a maximum of " + req.query.maxAmountOfReturnedPosts + " posts for uid " + req.query.uid);
    const result = await getPostsByUids(req.query.uid, req.query.maxAmountOfReturnedPosts);
    res.json(result);

}

module.exports = {
    fetchPostCountForUID,
    fetchPostsForUID,
    fetchPostsForUIDs
}