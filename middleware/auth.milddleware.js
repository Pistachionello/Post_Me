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

        req.body.jwt = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        if (e.name === "TokenExpiredError") {
            return res.status(200).json({warning: "Your token is expired, please re-login"});
        }
        return res.status(500).json({error: "Something went wrong on server"});
    }
}