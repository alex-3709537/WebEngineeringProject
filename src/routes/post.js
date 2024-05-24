const express = require("express");
const router = express.Router();

const { uploadPost } = require("../controller/postController");

router.post("/text", uploadPost);

module.exports = router;