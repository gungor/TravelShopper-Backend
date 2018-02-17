var ObjectID = require('mongodb').ObjectID
var redis = require('redis')
var client = redis.createClient('14812', 'redis-14812.c10.us-east-1-4.ec2.cloud.redislabs.com', {no_ready_check: true})

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
