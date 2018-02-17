const express = require('express')
const app = express()

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./conf/app.properties');

const mongourl = properties.get('mongodburl')
const port = properties.get('port')
const redisUrl = properties.get('redisurl')
const redisPort = properties.get('redisport')

var dbOperations = require('./db');
var cache = require('./cache');
var util = require('./util');
var resps = require('./response')

var redis = require('redis')

var client = redis.createClient(redisPort, redisUrl, {no_ready_check: true});

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
            resps.generalError(error,response);
        }
    ).catch( error => { resps.generalError(error,response); });
})

app.post('/getCountries', (request, response) => {
    var cacheResult;

    cache.getCache( client, "countries")
        .then( (result) => {
                console.log('promise 2 '+ result)
                cacheResult = result;
                if(result == null){
                    console.log(" cacheResult == null ")
                    return dbOperations.queryCountries(app)
                }
            }
        ).then(
            res => {
                console.log(" callback 1 ")
                if(cacheResult == null){
                    console.log( res )
                    cacheResult = res
                    return cache.setCache(client,"countries",res )
                }else{
                    console.log(" cacheResult not null " )
                }
            }
        ).then(
            res => {
                console.log(" cash set ")
                console.log(" return cacheResult ")
                resps.sendQueryCountriesSuccessResponse(response,cacheResult);
            }
        )


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
            resps.generalError(error,response);
        }
    ).catch( error => { resps.generalError(error,response); });
})

app.post('/createPreorder', (request, response) => {
    var getJSONDataPromise = util.getJSONData(request);
    getJSONDataPromise.then(
        (res) => {
            dbOperations.insertPreorder(app,
                (result) => {
                    resps.sendInsertPreorderSuccessResponse(response);
                },
                (err) => {
                    resps.sendDbErrorResponse(response);
                }
                , util.prepareRequestData(res));
        }
        , (err) => {
            resps.generalError(error,response);
        }
    ).catch( error => { resps.generalError(error,response); });
})

app.post('/createPreorder', (request, response) => {
    var getJSONDataPromise = util.getJSONData(request);
    getJSONDataPromise.then(
        (res) => {
            dbOperations.insertPreorder(app,
                (result) => {
                    resps.sendInsertPreorderSuccessResponse(response);
                },
                (err) => {
                    resps.sendDbErrorResponse(response);
                }
                , util.prepareRequestData(res));
        }
        , (err) => {
            resps.generalError(error,response);
        }
    ).catch( error => { resps.generalError(error,response); });
})

app.post('/queryPreorders', (request, response) => {
    var promise = util.createSimplePromise()
    promise.then(
        (res) => {
            dbOperations.queryPreorders(app,
                (result) => {
                    resps.sendQueryPreordersSuccessResponse(response,result);
                },
                (err) => {
                    resps.sendDbErrorResponse(response);
                });
        }
        , (err) => {
            resps.generalError(err,response);
        }
    ).catch( error => { resps.generalError(error,response); });
})

app.post('/createOrder', (request, response) => {
    var getJSONDataPromise = util.getJSONData(request);
    getJSONDataPromise.then(
        (res) => {
            dbOperations.insertOrder(app,
                (result) => {
                    resps.sendInsertOrderSuccessResponse(response);
                },
                (err) => {
                    resps.sendDbErrorResponse(response);
                }
                , util.prepareRequestData(res));
        }
        , (err) => {
            resps.generalError(error,response);
        }
    ).catch( error => { resps.generalError(error,response); });
})

app.post('/deleteKeys', (request,response) => {
    cache.deleteCache( client, "countries")
        .then( result => {
            resps.sendCreateTripSuccessResponse(response);
        }, error => {
            resps.generalError(error,response);
        } )
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})

module.exports = app;
