const {
    setPost
} = require("../model/azureSqlHandler");


const uploadPost = async (req, res, next) =>{
    console.log(req.body.post);
    const result = await setPost(req.session.user.username, req.body.post);

    res.json({ message : "gesendet"});
}

module.exports = {
    uploadPost
}