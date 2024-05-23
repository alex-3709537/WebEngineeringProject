const express = require("express");
const router = express.Router();
const { homeView } = require("../controller/indexController");


router.get("/", homeView);

module.exports = router;