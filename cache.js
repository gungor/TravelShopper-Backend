var ObjectID = require('mongodb').ObjectID
var redis = require('redis')

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./conf/app.properties');
const redisUrl = properties.get('redisurl')
const redisPort = properties.get('redisport')

var client = redis.createClient( redisPort, redisUrl, {no_ready_check: true})

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);

module.exports = {



    getCache: ( key , val ) => {
        return getAsync(key).then(function(res) {
            return res
        });
    },

    setCache: ( key, value) => {

        console.log( "key: "+ key + "value" + JSON.stringify(value))


            client.set(key, JSON.stringify(value) ,function(err){
                if( err ) {
                    console.log("setCache error: "+ err.message)

                }
                console.log('cache set success '+value)

            });



    },

    deleteCache: ( key, successCallback, errorCallback) => {

        return new Promise( (resolve, reject) => {
            console.log("deleteCache : "+ key )
            client.del(key, function(err, reply){
                if( err )
                    reject(err);
                resolve();
            })
        })


    },
}
