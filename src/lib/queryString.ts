module.exports.objToQueryString = (obj) => {
    return Object.keys(obj).map((key) => {

        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            throw new Error('Found nested objects into the input.')
        }

        return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
    }).join('&');
}