const express = require("express");
const router = express.Router();

const { 
    profileView

} = require("../controller/userController");
const { checkSignedIn } = require("../controller/loginController");


router.get("/profile", checkSignedIn, profileView);

module.exports =  router;
