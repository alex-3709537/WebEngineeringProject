const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { uploadPost,
    postContainerView,
    uploadFile,
    getPostFile,
    createPost,
    getFullPost
} = require("../controller/postController");
const { getFile } = require("../model/mysqlHandler");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/resources/'); // Speicherort für die hochgeladenen Dateien
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Benennt die Datei um
    }
});
const upload = multer({ storage: storage });

router.post("/text", uploadPost);

router.get("/view", postContainerView);

router.post("/file", upload.single("file"), uploadFile);

router.get("/file", getPostFile);

router.post("/", upload.single("file_input"), createPost);

router.get("/", getFullPost);

module.exports = router;