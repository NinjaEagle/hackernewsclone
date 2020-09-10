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
    createUser,
    getPostList,
    getCommentList
} = require("./API/user")

app.use(cors())
app.post("/validateUser", validateUser)
app.post("/createUser", createUser)
app.get("/getPostList", getPostList)
app.post("/getCommentList", getCommentList)


const {
    createPost,
    deletePost,
    editPost,
    addCommentToPost
} = require("./API/post")

app.post("/createPost", createPost)
app.delete("/deletePost/:post_id", deletePost)
app.put("/editPost/:post_id", editPost)
app.post("/addCommentToPost",addCommentToPost)
exports.api = functions.https.onRequest(app);