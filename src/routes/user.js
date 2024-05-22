const express = require("express");
const router = express.Router();

const { 
    profileView

} = require("../controller/userController");


router.get("/profile",  profileView);



module.exports =  router;
