module.exports = function (app, cache, responses, itemService, util) {



    app.post('/createItem', (request, response) => {
        var getJSONDataPromise = util.getJSONData(request)
        getJSONDataPromise.then(
            (res) => {
                return itemService.createItem(app, res)
            }
            , (err) => {
                throw err
            }
        ).then(
            () => {
                responses.sendCreateItemSuccessResponse(response)
            }
        ).catch(error => {
            responses.generalError(error, response)
        })
    })

    app.post('/queryItems', (request, response) => {
        var getJSONDataPromise = util.getJSONData(request)
        getJSONDataPromise.then(
            (res) => {
                return itemService.queryItems(app)
            }
            , (err) => {
                throw err
            }
        ).then(
            ( result) => {
                responses.sendQueryItemsSuccessResponse(response,result)
            }
        ).catch(error => {
            responses.generalError(error, response)
        })
    })

    app.post('/queryItemsByCountry', (request, response) => {
        var getJSONDataPromise = util.getJSONData(request)
        getJSONDataPromise.then(
            (res) => {
                return itemService.queryItemsByCountry(app, res)
            }
            , (err) => {
                throw err
            }
        ).then(
            (result) => {
                responses.sendQueryItemsSuccessResponse(response,result)
            }
        ).catch(error => {
            responses.generalError(error, response)
        })
    })


}

