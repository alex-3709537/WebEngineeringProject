const express = require("express");
const router = express.Router();

const { fetchPostCountForUID, fetchPostsForUID, fetchPostsForUIDs } = require("../controller/autoFetchController");

router.get("/getUserPostCount", fetchPostCountForUID);
router.get("/getUserPosts", fetchPostsForUIDs); // fetchPostsForUID);


module.exports = router;