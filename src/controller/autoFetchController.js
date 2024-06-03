const {
    getPostCountForUID,
    getPostsForUID
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

    const result = await getPostsForUID(req.session.user.uid, 20);
    res.json(JSON.stringify(result));
}

module.exports = {
    fetchPostCountForUID,
    fetchPostsForUID
}