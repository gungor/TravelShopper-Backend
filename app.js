const express = require('express')
var app = module.exports = express()

var PropertiesReader = require('properties-reader')
var properties = PropertiesReader('./conf/app.properties')

const mongourl = properties.get('mongodburl')
const port = properties.get('port')

//mongodb connection taken here
var connection = require('./dbconnection')
app.use(connection(app, mongourl, {}))

app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    next()
})

var cache = require('./cache')(properties)
var util = require('./utility')
var responses = require('./response')

var preorderService = require('./services/preorderService.js')(app)
var orderService = require('./services/orderService.js')(app)
var countryService = require('./services/countryService.js')(app)
var tripService = require('./services/tripService.js')(app)
var itemService = require('./services/itemService.js')(app)
var userService = require('./services/userService.js')(app)


require('./routes/country')(app,cache,responses,countryService)
require('./routes/trip')(app,cache,responses,tripService,util)
require('./routes/preorder')(app,cache,responses,preorderService,util)
require('./routes/order')(app,cache,responses,orderService,util)
require('./routes/item')(app,cache,responses,itemService,util)
require('./routes/user')(app,cache,responses,userService,util)

console.log('app starting')

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})

module.exports = app
