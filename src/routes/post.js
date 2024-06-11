const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { 
    createPost,
    getFullPost
} = require("../controller/postController");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname + "/../resources")); // Speicherort für die hochgeladenen Dateien
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Benennt die Datei um
    }
});
const upload = multer({ storage: storage });

router.post("/", upload.single("file_input"), createPost);

router.get("/", getFullPost);

module.exports = router;