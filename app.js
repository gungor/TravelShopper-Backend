const express = require('express')
const app = express()

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./conf/app.properties');

const mongourl = properties.get('mongodburl')
const port = properties.get('port')

var dbOperations = require('./db');
var util = require('./util');

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
        function (res) {
            dbOperations.insertTrip(app,
                (result) => {
                    response.send(JSON.stringify( {code: "0" , msg : "Success" } , null, 3));
                },
                (err) => {
                    response.send(JSON.stringify( {code: "-1" , msg : "Error" } , null, 3));
                }
                , util.prepareRequestData(res));
        }
        ,function(err) {
            response.send(JSON.stringify( {code: "-4" , msg : err.message } , null, 3));
        }
    )
})

app.post('/getCountries', (request, response) => {
    dbOperations.queryCountries(app,
                (result) => {
                    response.send(JSON.stringify( {code: "0" , msg : "Success", countries: result} , null, 3));
                },
                (err) => {
                    response.send(JSON.stringify( {code: "-1" , msg : "Error" } , null, 3));
                })
})

app.post('/searchTrips', (request, response) => {
    var getJSONDataPromise = util.getJSONData(request);
    getJSONDataPromise.then(
        function (res) {
            dbOperations.queryTrips(app,
                (result) => {response.send(JSON.stringify( {code: "0" , msg : "Success", trips: result} , null, 3));},
                (err) => {response.send(JSON.stringify( {code: "-1" , msg : "Error" } , null, 3));},
                res )

        }
        ,function(err) {
            response.send(JSON.stringify( {code: "-4" , msg : err.message } , null, 3));
        }
    )
})


app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})


module.exports = app;
