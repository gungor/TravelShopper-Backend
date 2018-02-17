var ObjectID = require('mongodb').ObjectID;

module.exports = function (app) {

    return{

        insertTrip: (app, parameters) => {
            return new Promise(function(resolve, reject) {
                console.log("insertTrip is called");
                var trip = {startDate: parameters.startDate,
                    endDate: parameters.endDate,
                    capacity: parameters.capacity,
                    country: parameters.country,
                    user_id : new ObjectID(parameters.userId)  };
                app.get('mongodb').db("packcarrydrive").collection("trip").insert(trip, {w: 1}, function(err, records){
                    if( err )
                        reject(err);
                    resolve()
                })
            })
        },

        queryTrips: (app, parameters) => {
            return new Promise(function(resolve, reject) {
                console.log("queryTrips is called " + parameters.startDate +","+ parameters.endDate );
                app.get('mongodb').db("packcarrydrive").collection("trip").find(
                    {
                        country: { $in: parameters.countries }
                        ,startDate: { $lt:  new Date(parameters.endDate + "T00:00:00.000Z") }
                        ,endDate : {  $gte :  new Date(parameters.startDate + "T00:00:00.000Z") }
                        ,capacity: { $gte : parameters.capacity }
                    }

                ).toArray(function (err, result) {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                })
            })
        }

    }

};

