const express = require("express");
const router = express.Router();

const {
    registerView,
    registerUser,
    loginUser,
    loginView,
    registrationSuccessView,
    logOut
} = require("../controller/loginController");



router.get("/login", loginView);

router.post("/login", loginUser);

router.post("/logout", logOut);

router.post("/register", registerUser);

router.get("/register", registerView);

router.get("/register/success", registrationSuccessView);

module.exports = router;