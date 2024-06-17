const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { 
    createPost,
    getFullPost,
    resizeImage
} = require("../controller/postController");


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("file_input"), resizeImage, createPost);

router.get("/", getFullPost);

module.exports = router;