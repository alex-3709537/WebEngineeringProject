const {
    getUserPostCount
} = require("../model/mysqlHandler");

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function startRefreshLoop(interval)
{
    while (true)
        {
            
            console.log("test");
            await sleep(10000);
        }
}



const getPostCount = async (req, res, next) =>{
    //console.log(req.body.post);
    
    const result = await getUserPostCount(req.session.user.uid);
    console.log(result[0]);
  
    if(result == "err"){
        res.json({ message : "error"});
    }else{
        res.json({ message : "send"});
    }
    
}

module.exports = {
    getPostCount,
    startRefreshLoop
}