module.exports = function (app, cache, responses, itemService, util) {


    //when customer (owner of order) and carrier approves a preorder (request of customer) , an order is created
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


}

