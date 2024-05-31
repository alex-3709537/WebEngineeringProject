const {
    getPostCountForUID
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

    console.log("fetchPostForUID called");
    console.log(req.body);

    
}

module.exports = {
    fetchPostCountForUID,
    fetchPostsForUID
}