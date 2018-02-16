var isodate = require("isodate");
var dateFormat = require('dateformat');

module.exports = {

    prepareRequestData: (requestData) => {
        requestData.endDate = requestData.endDate + "T00:00:00.000Z"
        requestData.startDate = requestData.startDate + "T00:00:00.000Z"
        return requestData;
    },

    insertTrip: (app,successCallback, errorCallback, parameters) => {

        console.log("insertTrip is called");

        var mongoDb = app.get('mongodb');
        var dbo = mongoDb.db("packcarrydrive");

        var trip = {startDate: parameters.startDate, endDate: parameters.endDate, capacity: parameters.capacity, country: parameters.country };

        dbo.collection("trip").insert(trip, {w: 1}, function(err, records){
            if( err )
                errorCallback(err);
            successCallback();
        });
    },

    queryCountries: (app,successCallback, errorCallback, parameters) => {

        console.log("queryCountries is called");

        var mongoDb = app.get('mongodb');
        var dbo = mongoDb.db("packcarrydrive");

        dbo.collection("country").find({}).toArray(function (err, result) {
            if (err) {
                errorCallback();
            }
            successCallback(result);
        });

    },


    returnParseError: (response) => {
        response.send(JSON.stringify({code: "-3", message: "Json parse error"}, null, 3));
    }
}
