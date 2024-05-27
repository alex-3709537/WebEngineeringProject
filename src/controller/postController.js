const {
    setPost
} = require("../model/mysqlHandler");



const uploadPost = async (req, res, next) =>{
    console.log(req.body.post);
    
    const result = await setPost(req.session.user.uid, req.body.post);
  
    if(result == "err"){
        res.json({ message : "error"});
    }else{
        res.json({ message : "send"});
    }
    
}

module.exports = {
    uploadPost
}