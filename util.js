var isodate = require("isodate");
var dateFormat = require('dateformat');

module.exports = {

    prepareRequestData: (requestData) => {
        requestData.endDate = new Date(requestData.endDate + "T00:00:00.000Z")
        requestData.startDate = new Date(requestData.startDate + "T00:00:00.000Z")
        return requestData;
    },

    returnParseError: (response) => {
        response.send(JSON.stringify({code: "-3", message: "Json parse error"}, null, 3));
    },

    getJSONData : (request) => {

        return new Promise(function(resolve, reject) {
            let requestData = [];

            request.on('error', (err) => {
                reject(err);
            }).on('data', (chunk) => {
                requestData.push(chunk);
            }).on('end', () => {
                requestData = JSON.parse(Buffer.concat(requestData).toString());
                resolve(requestData);
            })
        })
    },

    createSimplePromise : () => {
        return new Promise(function(resolve, reject) {
            try {
                resolve();
            }catch(err) {
                reject(err);
            }
        })
    }

}



