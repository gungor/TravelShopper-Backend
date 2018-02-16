const express = require('express')
const app = express()

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./conf/app.properties');

const mongourl = properties.get('mongodburl')
const port = properties.get('port')

var dbOperations = require('./db');

var connection = require('./dbconnection');
app.use(connection(app, mongourl, {}))

console.log('app starting')

app.post('/createTrip', (request, response) => {
    let requestData = [];

    response.setHeader('Content-Type', 'application/json');

    request.on('error', (err) => {
        response.send(JSON.stringify( {code: "-4" , msg : err.message } , null, 3));
    }).on('data', (chunk) => {
        requestData.push(chunk);
    }).on('end', () => {
        requestData = JSON.parse(Buffer.concat(requestData).toString());

        try {
            dbOperations.insertTrip(app,
                () => {
                    response.send(JSON.stringify( {code: "0" , msg : "Success" } , null, 3));
                },
                (err) => {
                    response.send(JSON.stringify( {code: "-1" , msg : "Error" } , null, 3));
                }
                , dbOperations.prepareRequestData(requestData));
        }catch(err){
            response.send(JSON.stringify( {code: "-2" , msg : err.message } , null, 3));
        }
    })

})

app.post('/createTrip', (request, response) => {
    let requestData = [];
    response.setHeader('Content-Type', 'application/json');
    request.on('error', (err) => {
        response.send(JSON.stringify( {code: "-4" , msg : err.message } , null, 3));
    }).on('data', (chunk) => {
        requestData.push(chunk);
    }).on('end', () => {
        requestData = JSON.parse(Buffer.concat(requestData).toString());

        try {
            dbOperations.queryCountries(app,
                (result) => {
                    response.send(JSON.stringify( {code: "0" , msg : "Success", countries: result} , null, 3));
                },
                (err) => {
                    response.send(JSON.stringify( {code: "-1" , msg : "Error" } , null, 3));
                }
                , dbOperations.prepareRequestData(requestData));
        }catch(err){
            response.send(JSON.stringify( {code: "-2" , msg : err.message } , null, 3));
        }
    })

})


app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})


module.exports = app;
