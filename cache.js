var redis = require('redis')

const {promisify} = require('util')

module.exports = function (properties) {

    console.log('cache.js module exports')
    const redisUrl = properties.get('redisurl')
    const redisPort = properties.get('redisport')

    var client = redis.createClient(redisPort, redisUrl, {no_ready_check: true})
    const getAsync = promisify(client.get).bind(client)

    return {
        getCache: (key) => {
            return getAsync(key).then(function (res) {
                return res
            })
        },

        setCache: (key, value) => {

            client.set(key, JSON.stringify(value), function (err) {
                if (err) {
                    console.log("setCache error: " + err.message)

                }
                console.log('cache set success : (' + key + ',' + value + ')')

            })

        }
    }
}
