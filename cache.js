var ObjectID = require('mongodb').ObjectID


module.exports = {

    getCache: (client, key ) => {

        return new Promise( (resolve, reject) => {
            console.log("getCache : "+ key)
            client.get(  key,  function(reply){
                console.log('json get')
                console.log( reply )
                resolve( JSON.parse( reply )  );
            });
        })

    },

    setCache: (client, key, value) => {

        value = JSON.stringify( value , null, 3);

        return new Promise( (resolve, reject) => {
            client.set(key, value  ,function(err){
                if( err )
                    reject(err);
                console.log('cache set success '+value)
                resolve( value );
            });
        })


    },

    deleteCache: (client, key, successCallback, errorCallback) => {

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
