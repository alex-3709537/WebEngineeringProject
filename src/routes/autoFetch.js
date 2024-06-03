const express = require("express");
const router = express.Router();

const { fetchPostCountForUID, fetchPostsForUID } = require("../controller/autoFetchController");

router.post("/getUserPostCount", fetchPostCountForUID);
router.post("/getUserPosts", fetchPostsForUID);


module.exports = router;