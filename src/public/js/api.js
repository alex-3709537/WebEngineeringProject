const servername = "localhost:8080";

/**
 * Einfache http Methode, die get oder post requests ausführen kann
 * 
 * @param {String} method http methode 
 * @param {String} path api pfad (/blog/...)
 * @param {String} input wenn post methode input für body
 * @returns json objekt
 */
export const sendReq = async (method, path, data = {}) => {
    const url = new URL(`http://${servername}${path}`);

   
    const metaInfo = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
        }
    }
    if (method == "POST") {
        metaInfo.body = JSON.stringify(data);
    }else if(method == "GET"){
        Object.keys(data).forEach(function (key, index) {
            url.searchParams.append(key, data[key]);
        });
    }

    try {
        const response = await fetch(url, metaInfo);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error('There was a problem with fetch operation:', error);
    }
}


/**
 * Methode kann verwendet werden um ejs elemente von Server zu fetchen. Bis jetzt aber nicht verwendet.
 * 
 * @param {string} path 
 * @param {object} data objekt in dem Parameter für die query enthalten sind. Serverseitig können die parameter mit req.query.beliebigerName
 *                      aufgerufen werden 
 * @returns gibt ein html Formular zurück
 */
const fetchView = async (path, data = {}) => {
    const url = new URL(`http://${servername}${path}`);

    Object.keys(data).forEach(function (key, index) {
        url.searchParams.append(key, data[key]);
    });


    const metaInfo = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
        }
    }

    try {
        const response = await fetch(url, metaInfo);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const result = await response.text();
        return result;

    } catch (error) {
        console.error('There was a problem with fetch operation:', error);
    }
}

/**
 * Methode wird verwendet um formData Objekte an dem Server zu senden. (Der Inhalt kommt aus dem Feldern im HTML <from> )
 * 
 * @param {*} path 
 * @param {*} formData 
 * @returns 
 */
const mpfd = async (path, formData) => {
    const url = `http://${servername}${path}`;

    const metaInfo = {
        method: "POST",
        body: formData
    }

    try {
        const response = await fetch(url, metaInfo);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error('There was a problem with fetch operation:', error);
    }
}


/**
 * Methode kann genutzt werden um einzelne Bild Dateien von der vom Server zu fetchen. Kann ggf. verwendet werden, z.B. 
 * beim Fetchen von Profilbilder o.ä.
 * 
 * @param {string} path 
 * @param {object} data 
 * @returns 
 */
const getBlob = async (path, data) => {
    const url = new URL(`http://${servername}${path}`);

    Object.keys(data).forEach(function (key, index) {
        url.searchParams.append(key, data[key]);
    });


    const metaInfo = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
        }
    }

    try {
        const response = await fetch(url, metaInfo);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const result = await response.blob();
        return result;

    } catch (error) {
        console.error('There was a problem with fetch operation:', error);
    }
}




/**
 * 
 * @returns objekt mit userid und username
 */
export const getUserInfo = async () => {
    const result = await sendReq("GET", "/blog/user/");
    return result;
}

/**
 * 
 * @returns array von objekten mit userid und username
 */
export const getAllUserInfo = async () => {
    const result = await sendReq("GET", "/blog/getAllUsers/");
    return result;
}

export const getUserByUID = async (uid) => {
    const result = await sendReq("GET", "/blog/user/uid", {uid:uid});
    return result;
}
export const getPostContainer = async (username, input) => {
    const data = {
        username: username,
        post: input
    }
    const result = await fetchView("/blog/post/view", data);
}
export const getUserPostCount = async (uid) => {
   const result = await sendReq("GET", "/blog/getUserPostCount/", uid);
    return result;
}
export const getPostCountForUIDs = async (uids) => {
    const reqBody = { uids: uids };
    console.log("reqbody: "+ JSON.stringify(reqBody));
    const result = await sendReq("GET", "/blog/getPostCountForUIDs/", JSON.stringify(reqBody));
     return result;
 }

export const getUserPostPids = async (uid, postCount) => {
    const reqBody = { uid: uid, maxAmountOfReturnedPosts: postCount };
    const pids = await sendReq("GET", "/blog/getUserPosts/", reqBody);
    return pids;
}

/**
 * Sendet den Post an den Server 
 * 
 * @param {} formData 
 * @returns 
 */
export const setPost = async (form) => {
    const formData = new FormData(form);
    const result = await mpfd("/blog/post", formData);
    
    return result;
}



/**
 * Fetcht den Post von dem Server (Text und media dateien)
 * @param {*} pid 
 * @returns Objekt mit html elementen
 */
export const getFullPost = async (pid) => {
    const path = "/blog/post";
    const data = {
        pid: pid
    };

    const url = new URL(`http://${servername}${path}`);

    Object.keys(data).forEach((key) => {
        url.searchParams.append(key, data[key]);
    });

    const response = await fetch(url);
    
    const contentType = response.headers.get('Content-Type');
    const boundary = contentType.split('boundary=')[1];
    const text = await response.text();
    const parts = text.split(`--${boundary}`).filter(part => part && part !== '--');
    console.log(text);
    const postElements = {};

    parts.forEach(part => {
        const [header, ...bodyParts] = part.split('\r\n\r\n');
        const body = bodyParts.join('\r\n\r\n').trim();
        
        const contentDispositionMatch = /Content-Disposition: form-data; name="([^"]+)"(; filename="([^"]+)")?/.exec(header);
        const typeMatch = /Content-Type: (.+)/.exec(header);

        if (contentDispositionMatch && typeMatch) {
            const fieldName = contentDispositionMatch[1].trim();
            const contentType = typeMatch[1].trim();
            console.log(fieldName +" : "+ body);
            if (contentType.startsWith('text/')) {
                
                postElements[fieldName] = body;
            } else if (contentType.startsWith('image/')) {
                const imageElement = document.createElement('img');
                imageElement.src = `data:${contentType};base64,${body}`;
                postElements[fieldName] = imageElement;
            } else if (contentType.startsWith('video/')) {
                const videoElement = document.createElement('video');
                videoElement.controls = true;
                videoElement.src = `data:${contentType};base64,${body}`;
                postElements[fieldName] = videoElement;
            }
        }
    });

  //  console.log("post: " + JSON.stringify(postElements));
    return postElements;
}
