module.exports = function (app, cache, responses, preorderService, util) {

    //customer creates preorder (a request existing in db, but no carrier linked to that order), by specifying country and product (item)
    app.post('/createPreorder', (request, response) => {
        var getJSONDataPromise = util.getJSONData(request);
        getJSONDataPromise.then(
            (res) => {
                return preorderService.insertPreorder(app, util.prepareRequestData(res))
            }
            , (err) => {
                throw err
            }
        )
        .then(
            () => {
                responses.sendInsertPreorderSuccessResponse(response)
            }
        ).catch( error => { responses.generalError(error,response) })
    });

    //all preorders (requests existing in db, but no carrier linked to that order) can be retrieved by this service
    app.post('/queryPreorders', (request, response) => {
        var promise = preorderService.queryPreorders(app);
        promise.then(
            (result) => {
                responses.sendQueryPreordersSuccessResponse(response,result)
            }
        ).catch( error => { responses.generalError(error,response) })
    });

    //customer searches her preorders
    app.post('/queryPreordersByCustomer', (request, response) => {
        var getJSONDataPromise = util.getJSONData(request);
        getJSONDataPromise.then(
            (res) => {
                return preorderService.queryPreordersByCustomer(app,res)
            }
            , (err) => {
                throw err
            }
        )
        .then(
            (result) => {
                responses.sendQueryPreordersSuccessResponse(response,result)
            }
        )
        .catch( error => { responses.generalError(error,response) })
    })

};