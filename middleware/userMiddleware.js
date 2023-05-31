const express = require('express')
const app = express()

const userMiddleware = (req, res, next) => {
    //code logic
    if (!req.body.id) {
        res.send("Please send Id")
    }
    if (!req.body.name) {
        res.send("Please Send Name")
    }
    if (!req.body.email) {
        res.send("Please Enter Email")
    }
    else {
        next()
    }

    next()
}

module.exports = {
    userMiddleware
}