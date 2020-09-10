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
                                success: true
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

exports.createUser = (request, response) =>{
    const body = request.body["body"];
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
                        uid: db_ref.id
                    })
                })
    
        } else {
            return response.status(500).json({
                error: "Duplicate User"
            })
        }

    });
    
        }
    })
}

exports.getCommentList = async (request, response) => {
    const body = JSON.parse(request.body["body"]);
    let posts = db.collection("/Posts");
    let all_comments = [];
    // const data = 
    await posts
    .get()
    .then((doc) => {
        doc.forEach((post) => {
            db
            .collection(`/Posts/${post.id}/comments`)
            .get()
            .then((doc) => {
                doc.forEach((comment) => {
                    let comment_data = comment.data();
                    comment_data.id = comment.id;
                    all_comments.push(comment_data)
                    // console.log(comment_data)
                    // console.log(all_comments)
                })
            })
        })
        console.log(all_comments);

        return all_comments;
    })
}


exports.getPostList = (request, response) => {
    const body = JSON.parse(request.body["body"]);
    let uid = body["uid"];
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