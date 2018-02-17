const express = require('express')
var app = module.exports = express()

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./conf/app.properties');

const mongourl = properties.get('mongodburl')
const port = properties.get('port')

//mongodb connection taken here
var connection = require('./dbconnection');
app.use(connection(app, mongourl, {}))

app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

var dbOperations = require('./db');
var cache = require('./cache');
var util = require('./utility');
var responses = require('./response')

var orderService = require('./services/orderService.js')(app)

require('./routes/country')(app,cache,responses,dbOperations)
require('./routes/trip')(app,cache,responses,dbOperations,util)
require('./routes/preorder')(app,cache,responses,dbOperations,util)
require('./routes/order')(app,cache,responses,orderService,util)

console.log('app starting')

app.post('/deleteKeys', (request,response) => {
    cache.deleteCache(  "countries")
        .then( result => {
            responses.sendCreateTripSuccessResponse(response);
        }, error => {
            responses.generalError(error,response);
        } )
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})

module.exports = app;
