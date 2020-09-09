const functions = require('firebase-functions');
const app = require("express")()
const cors = require('cors');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const {
    validateUser,
    createUser
} = require("./API/user")
app.use(cors())

app.post("/validateUser", validateUser)
app.post("/createUser", createUser)
exports.api = functions.https.onRequest(app);