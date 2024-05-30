const servername = "localhost:8080";

/**
 * 
 * @param {String} method http methode 
 * @param {String} path api pfad (/blog/...)
 * @param {String} input wenn post methode input für body
 * @returns 
 */
export const sendReq = async (method, path, input = "") => {
    const url = `http://${servername}${path}`;

    const data = {
        post: input
    };

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

/**
 * 
 * @param  post  Inhalt vom Post
 * @returns 
 */
export const setPost = async (post) => {
    const result =  await sendReq("POST", "/blog/post/text", post);
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

