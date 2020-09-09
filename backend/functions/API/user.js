const firebase = require("firebase");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { admin, db } = require("../utils/admin");
const { query } = require("express");

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
                                success: "true"
                            })
                        } else {
                            return response.status(200).json({
                                success: "false"
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
                hash: hash
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