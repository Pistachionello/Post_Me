//Importing express router for setting up routes
const router = require("express").Router();

//Configure desired paths
const UserModule = require("../modules/User-module");
const authMiddleware = require("../middleware/auth.milddleware")

//Configure desired paths

/** Create comment route
 *
 * Expected input:
 * Authorization token,
 * const post = {
 *     title,
 *     description,
 *     publication_date, // is established by server
 * }
 *
 * Expected output:
 * Post created by user,
 */
router.post("/post/create", authMiddleware, async (req, res) => {
    const {id} = req.body.jwt.user;
    const {title, description} = req.body;
    const publication_date = new Date();
    const post = {user_id: id, title, description, publication_date, last_update_date: publication_date};

    if (!id || !title || !description) {
        return res.status(200).json({error: "Please provide a valid data"});
    }

    try {
        //Check if user exists
        const user = await UserModule.findById(id);
        if (!user) {
            return res.status(200).json({error: "User is not found when creating post"});
        }
        const result = await UserModule.createPost(post);

        return res.status(201).json({success: "Post was successful created!", result});
    } catch (err) {
        return res.status(500).json({error: "Something went wrong on server", err});
    }
})

/** Get all posts created by user
 *
 * Expected input:
 * Authorization token
 *
 * Expected output:
 * All posts created by user
 */
router.get("/posts", authMiddleware, async (req, res) => {
    const {id} = req.body.jwt.user;

    if (!id) {
        return res.status(200).json({error: "Please provide a valid data"});
    }

    try {
        //Check if user exists
        const user = await UserModule.findById(id);
        if (!user) {
            return res.status(200).json({error: "User is not found when receiving posts"});
        }

        const result = await UserModule.getAllUserPostsById(id);
        return res.status(200).json({success: "Posts was successful received!", result});
    } catch (err) {
        return res.status(500).json({error: "Something went wrong on server", err});
    }
})

/** Get user's post by id
 *
 * Expected input:
 * Authorization token
 * post id from req.params.id
 *
 * Expected output:
 * user's post by id
 */
router.get("/post/:postId", authMiddleware, async (req, res) => {
    const {id} = req.body.jwt.user;

    if (!id) {
        return res.status(200).json({error: "Please provide a valid data"});
    }

    try {
        //Check if user exists
        const user = await UserModule.findById(id);
        if (!user) {
            return res.status(200).json({error: "User is not found when receiving post"});
        }

        const result = await UserModule.getUserPostById(req.params.postId);
        return res.status(200).json({success: "Post was successful received!", result});
    } catch (err) {
        return res.status(500).json({error: "Something went wrong on server", err});
    }
})

/** Update user's post
 *
 * Expected input:
 * Authorization token
 *
 * Post changes
 * const post = {
 *     title,
 *     description,
 *     last_update_date = new Date(); // is established by server
 * }
 *
 * Expected output:
 * Post updated by user,
 */
router.put("/post/:postId", authMiddleware, async (req, res) => {
    const {id} = req.body.jwt.user;
    const postId = req.params.postId;
    const {title, description} = req.body;
    const last_update_date = new Date();
    const post = {title, description, last_update_date};

    if (!id || !title || !description || !postId) {
        return res.status(200).json({error: "Please provide a valid data"});
    }

    try {
        //Check if user exists
        const user = await UserModule.findById(id);
        if (!user) {
            return res.status(200).json({error: "User is not found when updating post"});
        }
        //Check if updated post belongs to the same user
        if (!await UserModule.checkIfPostToUser(id, postId)) {
            return res.status(200).json({error: "Post is not found when updating post"});
        }

        const result = await UserModule.updatePostById(postId, post);
        return res.status(200).json({success: "Posts was successful updated!", result});
    } catch (err) {
        return res.status(500).json({error: "Something went wrong on server", err});
    }
})

/** Delete user's post
 *
 * Expected input:
 * Authorization token
 * postId // will be get from req.params.postId
 *
 * Expected output:
 * Deleting a user's post
 */
router.delete("/post/:postId", authMiddleware, async (req, res) => {
    const {id} = req.body.jwt.user;
    const postId = req.params.postId;

    if (!id || !postId) {
        return res.status(200).json({error: "Please provide a valid data"});
    }

    try {
        //Check if user exists
        const user = await UserModule.findById(id);
        if (!user) {
            return res.status(200).json({error: "User is not found when deleting post"});
        }
        //Check if deleting post belongs to the same user
        if (!await UserModule.checkIfPostToUser(id, postId)) {
            return res.status(200).json({error: "Post is not found when deleting post"});
        }

        await UserModule.deletePost(postId);

        return res.status(200).json({success: "Post was successful deleted!"});
    } catch (err) {
        return res.status(500).json({error: "Something went wrong on server", err});
    }
})

/** Update user email
 *
 * Expected input:
 * Authorization token,
 * userId // will be get from req.params.userId,
 * data to be changed in body
 * const changes = {
 *     email
 * }
 *
 * Expected output:
 * Update user email
 */
router.put("/:userId/email", authMiddleware, async (req, res) => {
    const {id} = req.body.jwt.user;
    const userId = req.params.userId;
    const email = req.body.changes;

    if (!id || !userId || parseInt(id) !== parseInt(userId) || !email) {
        return res.status(200).json({error: "Not authorized"});
    }

    try {
        //Check if user exists
        const user = await UserModule.findById(id);
        if (!user) {
            return res.status(200).json({error: "User is not found when updating user"});
        }

        //Check if exists user with the same nickname
        const sameEmail = await UserModule.findByFilterFirst(email)
        if (sameEmail) {
            return res.status(200).json({warning: "This email already exists"});
        }

        const result = await UserModule.updateUser(id, email);

        return res.status(200).json({success: "User was successful updated!", result});
    } catch (err) {
        return res.status(500).json({error: "Something went wrong on server", err});
    }
})

/** Update user nickname
 *
 * Expected input:
 * Authorization token,
 * userId // will be get from req.params.userId,
 * data to be changed in body
 * const changes = {
 *     nickname
 * }
 *
 * Expected output:
 * Update user nickname
 */
router.put("/:userId/nickname", authMiddleware, async (req, res) => {
    const {id} = req.body.jwt.user;
    const userId = req.params.userId;
    const nickname = req.body.changes;

    if (!id || !userId || parseInt(id) !== parseInt(userId) || !nickname) {
        return res.status(200).json({error: "Not authorized"});
    }

    try {
        //Check if user exists
        const user = await UserModule.findById(id);
        if (!user) {
            return res.status(200).json({error: "User is not found when updating user"});
        }

        //Check if exists user with the same nickname
        const sameNickname = await UserModule.findByFilterFirst(nickname)
        if (sameNickname) {
            return res.status(200).json({warning: "This nickname already exists"});
        }

        const result = await UserModule.updateUser(id, nickname);

        return res.status(200).json({success: "User was successful updated!", result});
    } catch (err) {
        return res.status(500).json({error: "Something went wrong on server", err});
    }
})


//Exporting out routes for usage
module.exports = router;