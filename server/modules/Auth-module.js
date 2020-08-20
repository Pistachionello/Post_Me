//Import db access
const db = require("../db/dbConfig");

//Import required modules || attributes
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "test_token";
const UserModule = require("./User-module");

//Exporting methods, which somehow communicate with db
module.exports = {
    login,
    register,
    authenticate,
    generateToken
}

async function login(email) {
    return UserModule.findByFilterFirst({email});
}

async function register(user) {
    const userToCreate = user;
    userToCreate["password"] = bcryptjs.hashSync(userToCreate.password, 12) // 2 ^ n, n = second argument

    await UserModule.add(userToCreate);
}

function authenticate(req, res, next) {
    const token = req.get('Authorization');
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).json(err);
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        res.status(401).json({error: 'No token provided, must be set on the Authorization Header'});
    }
}

//Generate Token
function generateToken(user) {
    const payload = {user};
    const options = {
        expiresIn: '1h',
    };
    return jwt.sign(payload, secret, options)
}
