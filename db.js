module.exports = {

    insertTrip: (app,successCallback, errorCallback, parameters) => {
        console.log("insertTrip is called")
        var trip = {startDate: parameters.startDate, endDate: parameters.endDate, capacity: parameters.capacity, country: parameters.country };
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

    queryCountries: (app,successCallback, errorCallback) => {
        console.log("queryCountries is called");
        app.get('mongodb').db("packcarrydrive").collection("country").find({}).toArray(function (err, result) {
            if (err) {
                errorCallback();
            }
            successCallback(result);
        });
    }
}
