var ObjectID = require('mongodb').ObjectID

module.exports = function (app) {

    return{
        insertPreorder : (app,parameters) => {
            return new Promise(function(resolve, reject) {
                console.log("insertPreorder is called")
                var preOrder = {startDate: parameters.startDate,
                    endDate: parameters.endDate,
                    capacity: parameters.capacity,
                    country: parameters.country,
                    item_id: new ObjectID(parameters.itemId),
                    user_id : new ObjectID(parameters.userId)
                }
                app.get('mongodb').db("packcarrydrive").collection("preorder").insert(preOrder, {w: 1}, function(err, records){
                    if( err )
                        reject(err)
                    resolve()
                })
            })
        },

        queryPreorders : (app) => {
            return new Promise(function(resolve, reject) {
                console.log("queryPreorders is called")

                app.get('mongodb').db("packcarrydrive").collection("preorder").aggregate(
                    [
                        {
                            $lookup:
                                {
                                    from: "item",localField: "item_id",foreignField: "_id",as: "items"
                                }
                        },
                        {
                            $lookup:
                                {
                                    from: "user",localField: "user_id",foreignField: "_id",as: "customers"
                                }
                        }
                    ]
                ).toArray(function (err, result) {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                })
            })
        },

        queryPreordersByCustomer : (app, parameters) => {
            return new Promise(function(resolve, reject) {

                console.log("queryPreordersByCustomer is called")

                app.get('mongodb').db("packcarrydrive").collection("preorder").aggregate(
                    [
                        {
                            $match:
                                {
                                    user_id : new ObjectID(parameters.customerId)
                                }
                        },
                        {
                            $lookup:
                                {
                                    from: "item",localField: "item_id",foreignField: "_id",as: "items"
                                }
                        },
                        {
                            $lookup:
                                {
                                    from: "user",localField: "user_id",foreignField: "_id",as: "customers"
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
        }
    }

}

