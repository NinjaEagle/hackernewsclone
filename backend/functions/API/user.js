const firebase = require("firebase");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { admin, db } = require("../utils/admin");
const { query, response } = require("express");

exports.validateUser = (request, response) => {
    const body = JSON.parse(request.body["body"]);
    var username = body["username"];
    var password = body["password"];
    var uid = body["uid"];
    const collection_ref = db.collection("/Users");
    var query_res = collection_ref.where("username", "==",  username).get().then((res) => {
        if (res.docs.length == 1) {
            res.docs.forEach(element => {
                var userData = element.data();
                bcrypt.compare(password, userData["password"], (err, same) => {
                    if (err) {
                        return response.status(500).json({
                            error : err
                        })
                    } else {
                        if (same) {
                            return response.status(200).json({
                                success: true,
                                user_id: element.id
                            })
                        } else {
                            return response.status(200).json({
                                success: false
                            })
                        }
                    }
                })
            });
        } else {
            return response.status(500).json({
                error: "Duplicate users found"
            })
        }
    })
    
}

exports.getUserProfile = (request, response) => {
    const body = JSON.parse(request.body["body"]);
    var uid = body["user_id"];
    db
    .collection("/Users")
    .doc(uid)
    .get()
    .then((doc) => {
        if (!doc.exists) {
            response.status(200).json({
                error: "User not found"
            })
        }
        var user_data = doc.data();
        response.status(200).json({
            user: user_data
        })

    })

}

exports.createUser = (request, response) =>{
    const body = JSON.parse(request.body["body"]);
    var username = body["username"];
    var password = body["password"];
        console.info(username);
        console.info(password);
    bcrypt.hash(password, 10, (err, hash) => {
        
        if (err) {
            console.error(err)
            return response.status(500).json({
                error: err,
                description: "Hashing failed",
                username: username,
                password: password,
                hash: hash,

            })
        } else {
            var user = {
                username: username,
                password: hash,
                posts: [],
                upvotes: []
            }
    const collection_ref = db.collection("/Users");
    var checked;
    var query_res = collection_ref.where("username", "==",  username).get().then((res) => {
        checked = res.docs.length == 0 ? true : false
        if (checked) {
            const db_ref = db
                        .collection("/Users")
                        .doc()
            db_ref.set(user)
                 .then((doc) => {
                    return response.status(200).json({
                        success: "true",
                        user_id: db_ref.id
                    })
                })
    
        } else {
            return response.status(200).json({
                error: "Duplicate User"
            })
        }

    });
    
        }
    })
}




exports.getCommentList = (request, response) => {
    // console.log()
    // console.log(request)
    // const body = JSON.parse(request.body["body"]);
    let post_id = request.params.post_id;
    let posts = db.collection("/Posts").doc(post_id).collection("/comments");
    let all_comments = [];
    // const data = 
    posts
    .get()
    .then((doc) => {
        doc.forEach((comment) => {
            let comment_data = comment.data()
            comment_data.comment_id = comment.id;     
            all_comments.push(comment_data)
        })
        return response.json({
            comments: all_comments
        })
    })
}


exports.getPostList = (request, response) => {
    console.log("here")
    let posts = db.collection("/Posts");
    let all_posts = [];
    posts
    .get()
    .then((doc) => {
        doc.forEach((post) => {
            let post_data = post.data();
            post_data.post_id = post.id;
            all_posts.push(post_data);
        })
        return response.status(200).json({
            posts: all_posts
        })
    })

}