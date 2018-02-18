module.exports = function (app, cache, responses, tripService, util) {

    //a possible carrier, records his trip information by this service
    app.post('/createTrip', (request, response) => {
        var getJSONDataPromise = util.getJSONData(request)
        getJSONDataPromise.then(
            (res) => {
                return tripService.insertTrip(app, util.prepareRequestData(res))
            }
            , (err) => {
                throw err
            }
        ).then(
            () => {
                responses.sendCreateTripSuccessResponse(response)
            }
        ).catch(error => {
            responses.generalError(error, response)
        })
    }),

    //all users (customers and carriers) can query all trips by time and country criteria
    app.post('/searchTrips', (request, response) => {
        var getJSONDataPromise = util.getJSONData(request)
        getJSONDataPromise.then(
            (res) => {
                return tripService.queryTrips(app, res)
            }
            , (err) => {
                throw err
            }
        ).then(
            result => {
                responses.sendQueryTripsSuccessResponse(response, result)
            }
        ).catch(error => {
            responses.generalError(error, response)
        })
    })
}