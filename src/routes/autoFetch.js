const express = require("express");
const router = express.Router();

const { fetchPostCountForUID, fetchPostCountForUIDs, fetchAllUsers, fetchPostsForUIDs } = require("../controller/autoFetchController");

router.get("/getUserPostCount", fetchPostCountForUID);
router.get("/getPostCountForUIDs", fetchPostCountForUIDs);
router.get("/getUserPosts", fetchPostsForUIDs);
router.get("/getAllUsers", fetchAllUsers);



module.exports = router;