//Importing express router for setting up routes
const router = require("express").Router();

//Importing modules, which will be used in router's paths
const AuthModule = require("../modules/Auth-module");
const UserModule = require("../modules/User-module");
const authMiddleware = require("../middleware/auth.milddleware");
const bcryptjs = require("bcryptjs");

//Configure desired paths

/** User login route.
 *
 * Expected input:
 * user = {
 *     email,
 *     password
 * }
 *
 * Expected output:
 * user authentication,
 * response:
 * token
 *
 */
router.post("/login", async (req, res) => {
    const candidate = req.body.user;
    const {email, password} = candidate;
    if (!candidate || !password || !email) {
        return res.status(200).json({error: "Please provide a valid data for registration."});
    }

    try {
        const userData = await AuthModule.login(email);
        if (userData && bcryptjs.compareSync(password, userData.password)) {
            const token = AuthModule.generateToken(userData);
            return res.json({
                success: `Welcome ${userData.nickname}!`,
                token,
                id: userData.id
            });
        } else {
            return res.status(200).json({warning: "Invalid credentials"});
        }
    } catch (err) {
        return res.status(500).json({error: "Something went wrong on server", err});
    }
})

/** User registration route.
 *
 * Expected input:
 * user = {
 *     nickname,
 *     email,
 *     password
 * }
 *
 * Expected output:
 * user registration in db
 *
 */
router.post("/register", async (req, res) => {
    const user_data = req.body.user;
    const creation_date = new Date();
    const {nickname, password, email} = user_data;
    const candidate = {nickname, password, email, creation_date}
    if (!user_data || !nickname || !password || !email) {
        return res.status(200).json({error: "Please provide a valid data for registration."});
    }

    try {
        //Check if users exist with such nickname's and email's
        const sameNickname = await UserModule.findByFilterFirst({nickname})
        if (sameNickname) {
            return res.status(200).json({warning: "This nickname already exists"});
        }
        //Check if users exist with such nickname's and email's
        const sameEmail = await UserModule.findByFilterFirst({email})
        if (sameEmail) {
            return res.status(200).json({warning: "This email already exists"});
        }

        await AuthModule.register(candidate);
        return res.status(201).json({success: "User has been created"});
    } catch (err) {
        return res.status(500).json({error: "Something went wrong on server", err});
    }
})


/** User confirmation route.
 *
 * Expected input:
 * req.headers.authorization
 * Authorization: Bearer token(string)
 *
 * Expected output:
 * confirm user authorization
 *
 */
router.post("/authorize", authMiddleware, async (req, res) => {
    const {id, nickname, email} = req.body.jwt.user;
    if (!req.body.jwt || !id || !nickname || !email) {
        return res.status(200).json({error: "Not authorized"});
    }

    try {
        //Check if user encoded in token exists
        const foundedUser = await UserModule.findByFilterFirst({id})
        if (!foundedUser) {
            return res.status(200).json({error: "Not authorized"});
        }

        const user = await UserModule.getUserDataById(id);

        return res.json({
            verified: true,
            user,
            success: "You are successfully authorized!"
        });
    } catch (err) {
        return res.status(500).json({error: "Something went wrong on server", err});
    }
})

//Exporting out routes for usage
module.exports = router;