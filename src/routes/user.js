const express = require("express");
const router = express.Router();

const { 
    profileView,
    userInfo,
    userInfoByUID

} = require("../controller/userController");


router.get("/profile",  profileView);

router.get("/", userInfo);
router.get("/:uid", userInfoByUID);


module.exports =  router;
