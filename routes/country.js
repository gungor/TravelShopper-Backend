module.exports = function (app, cache, responses, dbOperations) {

    app.get('/getCountries', (request, response) => {
        var countries

        cacheResult = cache.getCache("countries")
        cacheResult.then(
            function (result) {
                console.log(result)
                countries = result
                if (countries == null) {
                    return dbOperations.queryCountries(app)
                } else {
                    console.log('retrieving from redis')
                    countries = JSON.parse(countries)
                    responses.sendQueryCountriesSuccessResponse(response, countries);
                }
            }
        ).then(
            res => {
                if (countries == null) {
                    countries = res
                    cache.setCache('countries', countries)
                    responses.sendQueryCountriesSuccessResponse(response, countries);
                }
            }
        )
    })
}


