const express = require('express')
const app = express()

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./conf/app.properties');

const mongourl = properties.get('mongodburl')
const port = properties.get('port')

var dbOperations = require('./db');
var util = require('./util');
var resps = require('./response');

var connection = require('./dbconnection');
app.use(connection(app, mongourl, {}))

app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

console.log('app starting')

app.post('/createTrip', (request, response) => {
    var getJSONDataPromise = util.getJSONData(request);
    getJSONDataPromise.then(
         (res) => {
            dbOperations.insertTrip(app,
                (result) => {
                    resps.sendCreateTripSuccessResponse(response);
                },
                (err) => {
                    resps.sendDbErrorResponse(response);
                }
                , util.prepareRequestData(res));
        }
        , (err) => {
            generalError(error,response);
        }
    ).catch( error => { generalError(error,response); });
})

app.post('/getCountries', (request, response) => {
    var promise = util.createSimplePromise()

    promise.then(
        (res) => {
            dbOperations.queryCountries(app,
                (result) => {
                    resps.sendQueryCountriesSuccessResponse(response);
                },
                (err) => {
                    resps.sendDbErrorResponse(response);
                })
        },
        ( err ) => {
            generalError(error,response);
        }
    ).catch( error => { generalError(error,response); });

})

app.post('/searchTrips', (request, response) => {
    var getJSONDataPromise = util.getJSONData(request);
    getJSONDataPromise.then(
        (res) => {
            dbOperations.queryTrips(app,
                (result) => {
                    resps.sendQueryTripsSuccessResponse(response,result);
                },
                (err) => {
                    resps.sendDbErrorResponse(response);
                },
                res )
        }
        ,(err) => {
            generalError(error,response);
        }
    ).catch( error => { generalError(error,response); });
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})

module.exports = app;
