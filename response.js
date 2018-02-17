module.exports = {
    generalError : (error,response) => {
        response.send(JSON.stringify( {code: "-4" , msg : error.message } , null, 3));
    },

    returnParseError: response => {
        response.send(JSON.stringify({code: "-3", message: "Json parse error"}, null, 3));
    },

    sendCreateTripSuccessResponse : response => {
        response.send(JSON.stringify( {code: "0" , msg : "Success" } , null, 3));
    },

    sendDbErrorResponse : (response,error) => {
        response.send(JSON.stringify( {code: "-1" , msg : error.message} , null, 3));
    },

    sendQueryCountriesSuccessResponse: (response,result) => {
        response.send(JSON.stringify( {code: "0" , msg : "Success", countries: result} , null, 3));
    },

    sendQueryTripsSuccessResponse : (response,result) => {
        response.send(JSON.stringify( {code: "0" , msg : "Success", trips: result} , null, 3))
    },

    sendInsertPreorderSuccessResponse : response => {
        response.send(JSON.stringify( {code: "0" , msg : "Success" } , null, 3));
    },

    sendQueryPreordersSuccessResponse: (response,result) => {
        response.send(JSON.stringify( {code: "0" , msg : "Success", preorders: result} , null, 3))
    },

    sendInsertOrderSuccessResponse:  response => {
        response.send(JSON.stringify( {code: "0" , msg : "Success" } , null, 3));
    },


}



