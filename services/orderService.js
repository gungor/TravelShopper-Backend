var ObjectID = require('mongodb').ObjectID

module.exports = function (app) {

    return{
        createOrder : (app,parameters) => {
            return new Promise(function(resolve, reject) {
                console.log("createOrder is called")

                var order = {
                    startDate: parameters.startDate,
                    endDate: parameters.endDate,
                    capacity: parameters.capacity,
                    country: parameters.country,
                    item_id: new ObjectID(parameters.itemId),
                    customer_id : new ObjectID(parameters.customerId),
                    carrier_id : new ObjectID(parameters.carrierId),
                    status: "OPEN"
                }

                app.get('mongodb').db("packcarrydrive").collection("order").insert(order, {w: 1}, function(err, records){
                    if( err )
                        reject(err)
                    resolve()
                })
            })
        },

        closeOrder : (app, parameters) => {
            return new Promise(function(resolve, reject) {
                console.log("closeOrder is called")

                app.get('mongodb').db("packcarrydrive").collection("order").update(
                    {
                        _id: new ObjectID(parameters.orderId)
                    },
                    {
                        $set: {status: 'CLOSED'}
                    },
                    function (err, records) {
                        if (err)
                            reject(err)
                        resolve()
                    })
            })
        },

        queryOrderByCustomer  : (app,parameters) => {
            return new Promise(function(resolve, reject) {
                console.log("queryOrderByCustomer is called")

                app.get('mongodb').db("packcarrydrive").collection("order").aggregate(
                    [
                        {
                            $match:
                                {
                                    customer_id : new ObjectID(parameters.customerId)
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
                                    from: "user",localField: "carrier_id",foreignField: "_id",as: "carriers"
                                }
                        },
                        {
                            $lookup:
                                {
                                    from: "user",localField: "customer_id",foreignField: "_id",as: "customers"
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

        queryOrderByCarrier  : (app, parameters) => {
            return new Promise(function(resolve, reject) {
                console.log("queryOrderByCarrier is called")

                app.get('mongodb').db("packcarrydrive").collection("order").aggregate(
                    [
                        {
                            $match:
                                {
                                    carrier_id : new ObjectID(parameters.carrierId)
                                }

                        },
                        {
                            $lookup:
                                {
                                    from: "item",
                                    localField: "item_id",
                                    foreignField: "_id",
                                    as: "items"
                                }
                        },
                        {
                            $lookup:
                                {
                                    from: "user",
                                    localField: "carrier_id",
                                    foreignField: "_id",
                                    as: "carriers"
                                }
                        },
                        {
                            $lookup:
                                {
                                    from: "user",
                                    localField: "customer_id",
                                    foreignField: "_id",
                                    as: "customers"
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

