//Importing express router for setting up routes
const router = require("express").Router();

//Importing modules, which will be used in router's paths
const PostModule = require("../modules/Post-module");

//Configure desired paths

router.get("/post/:id", async (req, res) => {
    try {
        const result = await PostModule.findByIdWithUserData(req.params.id);
        if (!result) {
            return res.status(200).json({warning: `There is no post with id ${req.params.id}`});
        }
        return res.json({result, success: "Post was successfully received"});
    } catch (err) {
        return res.status(500).json({error: "Something went wrong on server", err});
    }
})

/** Leave comment route
 *
 * Expected input:
 * const comment = {
 *     postId,
 *     description,
 *     publication_date, // is established by server
 * }
 *
 * Expected output:
 * comment posted in post (postId),
 * res.status(201)
 *
 */
router.post("/post/:post_id/leave_comment", async (req, res) => {
    const post_id = req.params.post_id
    const {description} = req.body;
    const publication_date = new Date();
    const comment = {post_id, description, publication_date};

    if (!post_id || !description) {
        return res.status(200).json({error: "Please provide a valid data"});
    }

    try {
        //Check if post exists
        const post = await PostModule.findById(post_id);
        if (!post) {
            return res.status(200).json({error: "Post is not found when leaving comment post"});
        }

        const result = await PostModule.leaveCommentToPost(comment);
        return res.status(201).json({success: "Comment was successful created!", result});
    } catch (err) {
        return res.status(500).json({error: "Something went wrong on server", err});
    }

})

router.get("/posts", async (req, res) => {
    try {
        const result = await PostModule.findAll();
        if (!result) {
            return res.status(200).json({info: `There is no posts!`});
        }
        return res.json({result, success: "Posts was successfully received"});
    } catch (err) {
        return res.status(500).json({error: "Something went wrong on server", err});
    }
})

//Exporting out routes for usage
module.exports = router;
