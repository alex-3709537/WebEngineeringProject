const {
    setPost,
    setFile,
    getPost
} = require("../model/mysqlHandler");



const getFullPost = async (req, res) => {
    const result = await getPost(req.query.pid);

    result.data = arrayBufferToBase64(result.data);
    let contentType = "image/png";
    const boundary = 'boundary12345';

    res.writeHead(200, {
        'Content-Type': `multipart/mixed; boundary=${boundary}`
    });

    if(result.type == ".mp4"){
        contentType = "video/mp4";
    }

    // Textteil schreiben
    res.write(`--${boundary}\r\n`);
    res.write('Content-Type: text/plain\r\n\r\n');
    res.write(`${(result.post == null)? "" : result.post}\r\n`);

    if(result.data != ""){
        
        res.write(`--${boundary}\r\n`);
        res.write(`Content-Type: ${contentType}\r\n`);
        res.write('Content-Transfer-Encoding: base64\r\n\r\n');
        res.write(result.data);
    
    }
   
    // Abschlussgrenze
    res.end(`\r\n--${boundary}--`);

}

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