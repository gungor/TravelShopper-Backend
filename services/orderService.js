var ObjectID = require('mongodb').ObjectID

module.exports = function (app) {

    return{
        createOrder : (app,successCallback, errorCallback, parameters) => {
            console.log("createOrder is called");

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
                    errorCallback(err);
                successCallback();
            })
        },

        queryOrderByCustomer  : (app,successCallback, errorCallback, parameters) => {

            console.log("queryOrderByCustomer is called");

            app.get('mongodb').db("packcarrydrive").collection("order").aggregate(
                [
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
                    },
                    {
                        $match:
                            {
                                customer_id : new ObjectID(parameters.customerId)
                            }

                    }
                ]
            ).toArray(function (err, result) {
                if (err) {
                    console.log(err.message)
                    errorCallback();
                }
                successCallback(result);
            })
        },

        queryOrderByCarrier  : (app,successCallback, errorCallback, parameters) => {

            console.log("queryOrderByCarrier is called");

            app.get('mongodb').db("packcarrydrive").collection("order").aggregate(
                [
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
                    },
                    {
                        $match:
                            {
                                carrier_id : new ObjectID(parameters.carrierId)
                            }

                    }
                ]
            ).toArray(function (err, result) {
                if (err) {
                    console.log(err.message)
                    errorCallback();
                }
                successCallback(result);
            })
        }
    }

}

