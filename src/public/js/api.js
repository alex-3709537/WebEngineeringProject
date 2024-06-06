

const servername = "localhost:8080";

/**
 * 
 * @param {String} method http methode 
 * @param {String} path api pfad (/blog/...)
 * @param {String} input wenn post methode input für body
 * @returns 
 */
export const sendReq = async (method, path, data = {}) => {
    const url = `http://${servername}${path}`;

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
 * @param  post  Inhalt vom Post
 * @returns 
 */
export const setTextPost = async (post) => {
    const data = {
        post: post
    };
    const result = await sendReq("POST", "/blog/post/text", data);
    return result;
}

/**
 * 
 * @returns objekt mit userid und username
 */
export const getUserInfo = async () => {
    const result = await sendReq("GET", "/blog/user/");
    return result;
}

export const getPostContainer = async (username, input) => {
    const data = {
        username: username,
        post: input
    }
    const result = await fetchView("/blog/post/view", data);

    return result;
}

export const setFilePost = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const result = await mpfd("/blog/post/file", formData);
    return result;
}

export const getPostFile = async (fid) => {
    const result = await getBlob("/blog/post/file", { fid: fid });
    const img = document.createElement("img");

    img.src = URL.createObjectURL(result);

    return img;
}

export const getPost = async (pid) => {
    const result = await sendReq("GET", "/blog/post/text");
}

export const setPost = async (formData) => {

    const result = await mpfd("/blog/post", formData);
    console.log(result);
    return result;
}

export const getFullPost = async (pid) => {
    const path = "/blog/post"
    const data = {
        pid: pid
    };

    const url = new URL(`http://${servername}${path}`);

    Object.keys(data).forEach(function (key, index) {
        url.searchParams.append(key, data[key]);
    });
    const response = await fetch(url);
    
    let contentType = response.headers.get('Content-Type');
    const boundary = contentType.split('boundary=')[1];
    const text = await response.text();
    const parts = text.split(`--${boundary}`).filter(part => part && part !== '--');

    const postElements = {};

    parts.forEach(part => {
        const [header, body] = part.split('\r\n\r\n');
        
        const typeMatch = /Content-Type: (.+)/.exec(header);
        if (typeMatch) {
            let contentType = typeMatch[1].trim();
            if (contentType.startsWith('text/')) {
                const textElement = document.createElement('p');
                textElement.textContent = body.trim();
                postElements.text = textElement;
            } else if (contentType.startsWith('image/')) {
                const imageElement = document.createElement('img');
                imageElement.src = 'data:' + contentType + ';base64,' + body;
                postElements.img = imageElement;              
                postElements.media = imageElement;
            } else if (contentType.startsWith('video/')) {
                const videoElement = document.createElement('video');
                videoElement.controls = true;
                videoElement.src = 'data:' + contentType + ';base64,' + body;
                postElements.media = videoElement;
            }
        }
    });

    return postElements;
}