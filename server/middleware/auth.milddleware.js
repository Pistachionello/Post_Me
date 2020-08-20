require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
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
        return res.status(200).json({error: "Not authorized"});
    }
}