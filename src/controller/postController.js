const {
    setPost,
    setFile,
    getPostByPid,
    getPostByUid
} = require("../model/mysqlHandler");
const sharp = require("sharp");
const path = require("path");

const maxImageSize = 500;

const getFullPost = async (req, res) => {
    const result = await getPostByPid(req.query.pid);

    const boundary = 'boundary12345';

    res.writeHead(200, {
        'Content-Type': `multipart/form-data; boundary=${boundary}`
    });

    result.forEach(element => {
        for (const fieldName in element) {
            if (fieldName === "data") {
                if (element.data != "" && element.data != null) {
                    element[fieldName] = arrayBufferToBase64(element[fieldName]);
                    var contentType = element.type;

                    res.write(`--${boundary}\r\n`);
                    res.write(`Content-Disposition: form-data; name="${fieldName}"; filename="file${element.type}"\r\n`);
                    res.write(`Content-Type: ${contentType}\r\n`);
                    res.write('Content-Transfer-Encoding: base64\r\n\r\n');
                    res.write(`${element[fieldName]}\r\n`);
                }
            } else {
                res.write(`--${boundary}\r\n`);
                res.write(`Content-Disposition: form-data; name="${fieldName}"\r\n`);
                res.write('Content-Type: text/plain\r\n\r\n');
                res.write(`${element[fieldName] == null ? "" : element[fieldName]}\r\n`);
            }
        }
    });

    // Abschlussgrenze
    res.end(`--${boundary}--`);
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
        uid: req.session.uid, pid: result.insertId,
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

        
        if(height > maxImageSize || width > maxImageSize){
            var newWidth;
            var newHeight;
            if(height > width){
                newHeight = maxImageSize;
                newWidth = Math.floor((maxImageSize/height) * width);
            }else{
                newWidth = maxImageSize;
                newHeight = Math.floor((maxImageSize/width) * height);
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

module.exports = {
    createPost,
    getFullPost,
    resizeImage
}