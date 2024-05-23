const express = require("express");
const router = express.Router();

const {
    registerView,
    registerUser,
    loginUser,
    loginView,
    checkSignedIn,
    registrationSuccessView,
    logOut
} = require("../controller/loginController");

router.get("/", function (req, res) {
    res.send("Start seite html formular");
});


router.get("/login", loginView);

router.post("/login", loginUser);

router.post("/logout", logOut);

router.post("/register", registerUser);

router.get("/register", registerView);

router.get("/register/success", registrationSuccessView);

module.exports = router;