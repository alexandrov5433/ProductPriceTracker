async function requester(method, url, headers, data, shouldReturnResponseDerectly) {
    let options = {
        method,
        headers: {}
    };

    if (headers) {
        options.headers = Object.assign({}, headers);
    }

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        let res = await fetch(url, options);
        if (!res.ok) {
            throw new Error((await res.json()).message);
        }
        if (shouldReturnResponseDerectly) {
            return res;
        } else {
            return await res.json();
        }
    } catch (error) {
        console.error(`Error occured while fetching data:\n${url}\n${error}`);
        return error;
    }
}



async function getPageHTML(url) {
    return await (await requester('GET', url, null, null, true)).text();
}

async function getDemoData() {
    return await requester('GET', '../../demoData.json', null, null, false);
}

export const rest = {
    getPageHTML,
    getDemoData
};