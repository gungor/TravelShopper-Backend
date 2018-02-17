module.exports = function (app) {

    return{
        queryCountries: (app) => {
            console.log("queryCountries is called");

            return new Promise(function(resolve, reject) {
                app.get('mongodb').db("packcarrydrive").collection("country").find({}).toArray(function (err, result) {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                })
            })
        }
    }

};

