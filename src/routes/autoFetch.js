const express = require("express");
const router = express.Router();

const { fetchPostCountForUID } = require("../controller/autoFetchController");

router.post("/autoFetch", fetchPostCountForUID);

module.exports = router;