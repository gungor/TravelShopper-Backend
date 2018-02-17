var ObjectID = require('mongodb').ObjectID

module.exports = {

    insertTrip: (app,successCallback, errorCallback, parameters) => {
        console.log("insertTrip is called")
        var trip = {startDate: parameters.startDate,
                    endDate: parameters.endDate,
                    capacity: parameters.capacity,
                    country: parameters.country,
                    user_id : new ObjectID(parameters.userId)  };
        app.get('mongodb').db("packcarrydrive").collection("trip").insert(trip, {w: 1}, function(err, records){
            if( err )
                errorCallback(err);
            successCallback();
        });
    },

    queryTrips: (app,successCallback, errorCallback, parameters) => {
        console.log("queryTrips is called " + parameters.startDate +","+ parameters.endDate )
        app.get('mongodb').db("packcarrydrive").collection("trip").find(
            {
                country: { $in: parameters.countries }
                ,startDate: { $lt:  new Date(parameters.endDate + "T00:00:00.000Z") }
                ,endDate : {  $gte :  new Date(parameters.startDate + "T00:00:00.000Z") }
                ,capacity: { $gte : parameters.capacity }
            }

            ).toArray(function (err, result) {
            if (err) {
                errorCallback();
            }
            successCallback(result);
        });
    },

    queryCountries: (app) => {
        console.log("queryCountries is called");


        return new Promise(function(resolve, reject) {
            app.get('mongodb').db("packcarrydrive").collection("country").find({}).toArray(function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        })
    },

    insertPreorder : (app,successCallback, errorCallback, parameters) => {
        console.log("insertPreorder is called");
        var preOrder = {startDate: parameters.startDate,
            endDate: parameters.endDate,
            capacity: parameters.capacity,
            country: parameters.country,
            item_id: new ObjectID(parameters.itemId),
            user_id : new ObjectID(parameters.userId)
        };
        app.get('mongodb').db("packcarrydrive").collection("preorder").insert(preOrder, {w: 1}, function(err, records){
            if( err )
                errorCallback(err);
            successCallback();
        });
    },

    queryPreorders : (app,successCallback, errorCallback) => {
        console.log("queryPreorders is called");

        app.get('mongodb').db("packcarrydrive").collection("preorder").aggregate(
            [
                {
                    $lookup:
                    {
                        from: "item",
                        localField: "item_id",
                        foreignField: "_id",
                        as: "items"
                    }

                }
                ]
            ).toArray(function (err, result) {
            if (err) {
                console.log(err.message)
                errorCallback();
            }
            successCallback(result);
        });
    },

    createOrder : (app,successCallback, errorCallback, parameters) => {
        console.log("createOrder is called");

        var order = {
            startDate: parameters.startDate,
            endDate: parameters.endDate,
            capacity: parameters.capacity,
            country: parameters.country,
            item_id: new ObjectID(parameters.itemId),
            customer_id : new ObjectID(parameters.customerUserId),
            carrier_id : new ObjectID(parameters.carrierUserId),
            status: "OPEN"
        };

        app.get('mongodb').db("packcarrydrive").collection("order").insert(order, {w: 1}, function(err, records){
            if( err )
                errorCallback(err);
            successCallback();
        });
    }


}
