module.exports = function (app, cache, responses, orderService, util) {


    app.post('/createOrder', (request, response) => {
        var getJSONDataPromise = util.getJSONData(request);
        getJSONDataPromise.then(
            (res) => {
                orderService.createOrder(app,
                    (result) => {
                        responses.sendCreateOrderSuccessResponse(response);
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

    app.post('/queryOrderByCustomer', (request, response) => {
        var getJSONDataPromise = util.getJSONData(request);
        getJSONDataPromise.then(
            (res) => {
                orderService.queryOrderByCustomer(app,
                    (result) => {
                        responses.sendOrderSuccessResponse(response,result);
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

    app.post('/queryOrderByCarrier', (request, response) => {
        var getJSONDataPromise = util.getJSONData(request);
        getJSONDataPromise.then(
            (res) => {
                orderService.queryOrderByCarrier(app,
                    (result) => {
                        responses.sendOrderSuccessResponse(response,result);
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


}

