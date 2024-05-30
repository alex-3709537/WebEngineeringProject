const express = require("express");
const router = express.Router();

const { 
    profileView,
    userInfo

} = require("../controller/userController");


router.get("/profile",  profileView);

router.get("/", userInfo);

module.exports =  router;
