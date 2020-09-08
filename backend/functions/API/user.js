const { admin, db } = require("../utils/admin");
const firebase = require("firebase");

exports.validateUser = (request, response) => {
    const body = JSON.parse(request.body);
    console.log("Recieved: ")
    console.log(body);

    return response.status(200).json({
        success: "true"
    })
}