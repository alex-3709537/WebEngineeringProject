const {
    getPostCountForUID
} = require("../model/mysqlHandler");


const fetchPostCountForUID = async (req, res, next) =>{
    console.log(req.body.post);

    const result = await getPostCountForUID(req.session.user.uid);
    console.log(result[0]);
  
    if(result == "err"){
        res.json({ message : "error"});
    }else{
        res.json({ message : "send"});
    }
    next();
}

module.exports = {
    fetchPostCountForUID
}