module.exports = function (app) {

    return{

        createUser: (app, parameters) => {
            return new Promise(function(resolve, reject) {
                console.log("createUser is called")
                var user = {
                    fullname: parameters.fullname,
                    country: parameters.country,
                    create_date: new Date()
                }
                app.get('mongodb').db("packcarrydrive").collection("user").insert(user, {w: 1}, function(err, records){
                    if( err )
                        reject(err)
                    resolve()
                })
            })
        }


    }

}

