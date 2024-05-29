const express = require("express");
const router = express.Router();

const { refreshPage } = require("../controller/refreshController");

router.post("/update", uploadPost);

module.exports = router;