'use strict';

const Request = function(method, uri,  payload = null) {

    return new Promise((resolve, reject) => {

        var xhr = new XMLHttpRequest();
        xhr.open(method, uri);
        xhr.onload = () => {
            if ( xhr.status >= 200 && xhr.status < 300 ) {
                return resolve(xhr.responseText);
            } else {
                return reject(xhr);
            }
        };

        xhr.onerror = () => {
            reject(xhr);
        };

        if ( payload && typeof payload === 'object' ) {
            payload = JSON.stringify(payload);
        }

        return xhr.send(payload);
    });
};

export default Request;
