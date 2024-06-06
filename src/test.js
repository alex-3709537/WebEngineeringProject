const { setPost } = require("./model/mysqlHandler");



const test = async () => {
    const result = await setPost(1, "sussy baka");
    console.log(result);
}

module.exports = {test};