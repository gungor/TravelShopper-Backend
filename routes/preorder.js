module.exports = function (app, cache, responses, dbOperations, util) {

    app.post('/createPreorder', (request, response) => {
        var getJSONDataPromise = util.getJSONData(request);
        getJSONDataPromise.then(
            (res) => {
                dbOperations.insertPreorder(app,
                    (result) => {
                        responses.sendInsertPreorderSuccessResponse(response);
                    },
                    (err) => {
                        responses.sendDbErrorResponse(response);
                    }
                    , util.prepareRequestData(res));
            }
            , (err) => {
                responses.generalError(error,response);
            }
        ).catch( error => { responses.generalError(error,response); });
    })

    app.post('/queryPreorders', (request, response) => {
        var promise = util.createSimplePromise()
        promise.then(
            (res) => {
                dbOperations.queryPreorders(app,
                    (result) => {
                        responses.sendQueryPreordersSuccessResponse(response,result);
                    },
                    (err) => {
                        responses.sendDbErrorResponse(response);
                    });
            }
            , (err) => {
                responses.generalError(err,response);
            }
        ).catch( error => { responses.generalError(error,response); });
    })

}