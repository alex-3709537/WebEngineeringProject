const express = require("express");
const router = express.Router();

const { fetchPostCountForUID, fetchPostsForUID } = require("../controller/autoFetchController");

router.get("/getUserPostCount", fetchPostCountForUID);
router.get("/getUserPosts", fetchPostsForUID);


module.exports = router;