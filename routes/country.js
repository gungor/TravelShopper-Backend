module.exports = function (app, cache, responses, countryService) {


    //all countries received from this url, array returned. Once db data retrieved, it is stored in redis
    app.get('/getCountries', (request, response) => {
        var countries

        cacheResult = cache.getCache("countries")
        cacheResult.then(
            function (result) {
                console.log(result)
                countries = result
                if (countries == null) {
                    return countryService.queryCountries(app)
                } else {
                    console.log('retrieving from redis')
                    countries = JSON.parse(countries)
                    responses.sendQueryCountriesSuccessResponse(response, countries)
                }
            }
        ).then(
            res => {
                if (countries == null) {
                    countries = res
                    cache.setCache('countries', countries)
                    responses.sendQueryCountriesSuccessResponse(response, countries)
                }
            }
        )
    })
}


