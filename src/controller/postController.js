const {
    setPost,
    setFile,
    getPostByPid,
    getPostByUid,
    getLikesCount,
    getDistinctLike,
    changeLike,
    createLike,
    deleteLike
} = require("../model/mysqlHandler");
const sharp = require("sharp");
const path = require("path");
const { get } = require("http");

const maxImageSize = 500;

const getFullPost = async (req, res) => {
    try {
        const result = await getPostByPid(req.query.pid);
        const boundary = 'boundary12345';

        const fullPostPromises = result.map(async (element) => {
            const likes = await getLikes(element.pid);
            element.likes = likes.Like_Count;
            element.dislikes = likes.Dislike_Count;
            element.liked = await checkIfLiked(req.session.user.uid, element.pid);
            const parts = [];
            for (const fieldName in element) {
                if (fieldName === "data") {
                    if (element.data != "" && element.data != null) {
                        const contentType = element.type;
                        const base64Data = arrayBufferToBase64(element[fieldName]);

                        parts.push(
                            `--${boundary}\r\n` +
                            `Content-Disposition: form-data; name="${fieldName}"; filename="file${element.type}"\r\n` +
                            `Content-Type: ${contentType}\r\n` +
                            'Content-Transfer-Encoding: base64\r\n\r\n' +
                            `${base64Data}\r\n`
                        );

                    }
                } else {
                    parts.push(
                        `--${boundary}\r\n` +
                        `Content-Disposition: form-data; name="${fieldName}"\r\n` +
                        'Content-Type: text/plain\r\n\r\n' +
                        `${element[fieldName] == null ? "" : element[fieldName]}\r\n`
                    );
                }
            }
            return parts.join('');
        });

        const fullPosts = await Promise.all(fullPostPromises);

        res.writeHead(200, {
            'Content-Type': `multipart/form-data; boundary=${boundary}`
        });

        fullPosts.forEach(part => res.write(part));
        res.end(`--${boundary}--`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};



const createPost = async (req, res) => {
    const text = req.body.text_input;
    const file = req.file;

    const result = await setPost(req.session.user.uid, text);


    if (file != undefined) {
        console.log("Datei gesendet");

        const result2 = await setFile(result.insertId, req.file.buffer, req.file.mimetype);
    } else {
        console.log("Keine Datei gesendet");
    }

    res.json({
        message: "post erfolgreich hochgeladen",
        uid: req.session.user.uid, pid: result.insertId,
        username: req.session.user.username
    });
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

const resizeImage = async (req, res, next) => {
    if (!req.file || req.file.mimetype.split("/")[0] == "video") {
        return next();
    }

    try {

        const metadata = await sharp(req.file.buffer).metadata();
        console.log(`Breite : ${metadata.width}px Höhe: ${metadata.height}px`);
        req.file.metadata = metadata;
        const height = metadata.height;
        const width = metadata.width;


        if (height > maxImageSize || width > maxImageSize) {
            var newWidth;
            var newHeight;
            if (height > width) {
                newHeight = maxImageSize;
                newWidth = Math.floor((maxImageSize / height) * width);
            } else {
                newWidth = maxImageSize;
                newHeight = Math.floor((maxImageSize / width) * height);
            }

            const resizedImageBuffer = await sharp(req.file.buffer)
                .resize(newWidth, newHeight) // Ändere die Größe auf 300x300
                .toBuffer();

            req.file.buffer = resizedImageBuffer;
            console.log(`[NEW] Breite : ${newWidth}px Höhe: ${newHeight}px`);
        }


        next();
    } catch (err) {
        console.error(err);
    }
}

const setLike = async (req, res) => {
    try {
        const liked = req.body.liked;
        const pid = req.body.pid;
        const uid = req.session.user.uid;
        
        if( liked > 1 ) throw new Error("Like value must not be higher then 1");

        const result = await getDistinctLike(uid, pid);

        if (result == undefined) {

            await createLike(pid, uid, liked);
        } else {
            if ((result.liked == 1 && liked == 1) || (result.liked == 0 && liked == 0)) {
                await deleteLike(result.lid);
            } else {
                await changeLike(result.lid, liked);
            }
        }
        res.json({ message: "like changed" });
    } catch (err) {
        console.error(err.message);
    }

}

const getLikes = async (pid) => {
    const likes = await getLikesCount(pid);

    if (likes.Like_Count == null) {
        likes.Like_Count = 0;
    }
    if (likes.Dislike_Count == null) {
        likes.Dislike_Count = 0;
    }

    return likes;
}

const checkIfLiked = async (uid, pid) => {
    const liked = await getDistinctLike(uid, pid);
    if (liked != undefined) {
        const value = liked.liked;
        
        return value;
    }

    return -1;
}
module.exports = {
    createPost,
    getFullPost,
    resizeImage,
    setLike
}