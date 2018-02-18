module.exports = function (app, cache, responses, orderService, util) {


    //when customer (owner of order) and carrier approves a preorder (request of customer) , an order is created
    app.post('/createOrder', (request, response) => {
        var getJSONDataPromise = util.getJSONData(request)
        getJSONDataPromise.then(
            (res) => {
                return orderService.createOrder(app, util.prepareRequestData(res))
            }
            , (err) => {
                throw err
            }
        ).then(
            () => {
                responses.sendCreateOrderSuccessResponse(response)
            }
        ).catch(error => {
            responses.generalError(error, response)
        })
    })

    //when customer (owner of order) approves a order (request of customer) , order is closed
    app.post('/closeOrder', (request, response) => {
        var getJSONDataPromise = util.getJSONData(request)
        getJSONDataPromise.then(
            (res) => {
                return orderService.closeOrder(app, res)
            }
            , (err) => {
                throw err
            }
        ).then(
            () => {
                responses.sendCreateOrderSuccessResponse(response)
            }
        ).catch(error => {
            responses.generalError(error, response)
        })
    })

    //customer searches her orders
    app.post('/queryOrderByCustomer', (request, response) => {
        var getJSONDataPromise = util.getJSONData(request)
        getJSONDataPromise.then(
            (res) => {
                return orderService.queryOrderByCustomer(app, util.prepareRequestData(res))
            }
            , (err) => {
                throw err
            }
        ).then(
            (result) => {
                responses.sendOrderSuccessResponse(response, result)
            }
        ).catch(error => {
            responses.generalError(error, response)
        })
    })

    //carrier searches her all responsible orders
    app.post('/queryOrderByCarrier', (request, response) => {
        var getJSONDataPromise = util.getJSONData(request)
        getJSONDataPromise.then(
            (res) => {
                return orderService.queryOrderByCarrier(app, util.prepareRequestData(res))
            }
            , (err) => {
                throw err
            }
        ).then(
            (result) => {
                responses.sendOrderSuccessResponse(response, result)
            }
        ).catch(error => {
            responses.generalError(error, response)
        })
    })
}

