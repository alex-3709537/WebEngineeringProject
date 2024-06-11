const {
    setPost,
    setFile,
    getPostByPid,
    getPostByUid
} = require("../model/mysqlHandler");


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
                    let contentType;

                    if (element.type === ".mp4") {
                        contentType = "video/mp4";
                    } else if (element.type === ".jpg" || element.type === ".jpeg") {
                        contentType = "image/jpeg";
                    } else if (element.type === ".png") {
                        contentType = "image/png";
                    } else {
                        contentType = "text/plain";
                        element[fieldName] = "unknown-Content-Type";
                    }

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
    const image = req.file;

    const result = await setPost(req.session.user.uid, text);


    if (image != undefined) {
        console.log("Datei gesendet");
        const result2 = await setFile(req.file.filename, result.insertId);
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
module.exports = {
    createPost,
    getFullPost
}