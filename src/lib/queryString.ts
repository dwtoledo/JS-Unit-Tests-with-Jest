module.exports.objToQueryString = (obj) => {
    return Object.keys(obj).map((key) => {

        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            throw new Error('Found nested objects into the input.')
        }

        return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
    }).join('&');
}

module.exports.queryStringToObj = (queryString) => {
    let object = {}

    queryString.split('&').map(param => {
        const keyValue = param.split('=');

        if (decodeURIComponent(keyValue[1]).includes(',')) {
            object[keyValue[0]] = decodeURIComponent(keyValue[1]).split(',');

        } else {
            object[keyValue[0]] = decodeURIComponent(keyValue[1]);
        }
    });

    return object;
}