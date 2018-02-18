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
                    country : new ObjectID(parameters.countryId)
                }

                app.get('mongodb').db("packcarrydrive").collection("item").insert(item, {w: 1}, function(err, records){
                    if( err )
                        reject(err)
                    resolve()
                })
            })
        }
    }

}

