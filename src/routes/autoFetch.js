const express = require("express");
const router = express.Router();

const { fetchPostCountForUID, fetchPostCountForUIDs, fetchAllUsers, fetchPostsForUIDs } = require("../controller/autoFetchController");

router.get("/userPostCount", fetchPostCountForUID);
router.get("/postCountForUIDs", fetchPostCountForUIDs);
router.get("/userPosts", fetchPostsForUIDs);
router.get("/allUsers", fetchAllUsers);



module.exports = router;