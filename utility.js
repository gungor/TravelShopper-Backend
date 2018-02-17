module.exports = {

    prepareRequestData: (requestData) => {
        requestData.endDate = new Date(requestData.endDate + "T00:00:00.000Z");
        requestData.startDate = new Date(requestData.startDate + "T00:00:00.000Z");
        return requestData
    },

    getJSONData : (request) => {

        return new Promise(function(resolve, reject) {
            let requestData = [];

            request.on('error', (err) => {
                reject(err)
            }).on('data', (chunk) => {
                requestData.push(chunk)
            }).on('end', () => {
                try {
                    requestData = JSON.parse(Buffer.concat(requestData).toString())
                }catch(err){
                    reject(err)
                }
                resolve(requestData)
            })
        })
    }

};



