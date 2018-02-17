module.exports = function (app, cache, responses, dbOperations, util) {

    app.post('/createTrip', (request, response) => {
        var getJSONDataPromise = util.getJSONData(request);
        getJSONDataPromise.then(
            (res) => {
                dbOperations.insertTrip(app,
                    (result) => {
                        responses.sendCreateTripSuccessResponse(response);
                    },
                    (err) => {
                        responses.sendDbErrorResponse(response);
                    }
                    , util.prepareRequestData(res));
            }
            , (err) => {
                responses.generalError(error, response);
            }
        ).catch(error => {
            responses.generalError(error, response);
        });
    }),

    app.post('/searchTrips', (request, response) => {
        var getJSONDataPromise = util.getJSONData(request);
        getJSONDataPromise.then(
            (res) => {
                dbOperations.queryTrips(app,
                    (result) => {
                        responses.sendQueryTripsSuccessResponse(response, result);
                    },
                    (err) => {
                        responses.sendDbErrorResponse(response);
                    },
                    res)
            }
            , (err) => {
                responses.generalError(error, response);
            }
        ).catch(error => {
            responses.generalError(error, response);
        });
    })
}