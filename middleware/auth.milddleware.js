require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }

    if (!req.headers.authorization) {
        return res.status(200).json({error: "Not authorized"});
    }

    try {
        const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"
        if (!token) {
            return res.status(200).json({error: "Not authorized"});
        }

        const secretKey = process.env.JWT_SECRET;
        req.body.jwt = jwt.verify(token, secretKey);
        next();
    } catch (e) {
        // console.log(e)
        return res.status(500).json({error: "Something went wrong on server"});
    }
}