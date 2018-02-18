var ObjectID = require('mongodb').ObjectID

module.exports = function (app) {

    return{
        createItem : (app,parameters) => {
            return new Promise(function(resolve, reject) {
                console.log("createItem is called")

                var item = {
                    name : parameters.itemName,
                    price: parameters.price,
                    currency: parameters.currency,
                    country_id : new ObjectID(parameters.countryId)
                }

                app.get('mongodb').db("packcarrydrive").collection("item").insert(item, {w: 1}, function(err, records){
                    if( err )
                        reject(err)
                    resolve()
                })
            })
        },

        queryItems  : (app,parameters) => {
            return new Promise(function(resolve, reject) {
                console.log("queryItems is called")

                app.get('mongodb').db("packcarrydrive").collection("item").aggregate(
                    [
                        {
                            $lookup:
                                {
                                    from: "country",localField: "country_id",foreignField: "_id",as: "countries"
                                }
                        }
                    ]
                ).toArray(function (err, result) {
                    if (err) {
                        console.log(err.message)
                        reject(err)
                    }
                    resolve(result)
                })
            })
        },

        queryItemsByCountry  : (app,parameters) => {
            return new Promise(function(resolve, reject) {
                console.log("queryItemsByCountry is called")

                app.get('mongodb').db("packcarrydrive").collection("item").aggregate(
                    [
                        {
                            $match:
                                {
                                    country_id : new ObjectID(parameters.countryId)
                                }

                        },
                        {
                            $lookup:
                                {
                                    from: "country",localField: "country_id",foreignField: "_id",as: "countries"
                                }
                        }
                    ]
                ).toArray(function (err, result) {
                    if (err) {
                        console.log(err.message)
                        reject(err)
                    }
                    resolve(result)
                })
            })
        },


    }

}

