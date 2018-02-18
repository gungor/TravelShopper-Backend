module.exports = function (app, responses, userService, util) {


    //when customer (owner of order) and carrier approves a preorder (request of customer) , an order is created
    app.post('/createUser', (request, response) => {
        var getJSONDataPromise = util.getJSONData(request)
        getJSONDataPromise.then(
            (res) => {
                return userService.createUser(app, res)
            }
            , (err) => {
                throw err
            }
        ).then(
            () => {
                responses.sendCreateUserSuccessResponse(response)
            }
        ).catch(error => {
            responses.generalError(error, response)
        })
    })


}

