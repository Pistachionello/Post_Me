//Import db access
const db = require("../db/dbConfig")

//Import required modules || attributes
const CommentModule = require("./Comment-module");

//Exporting methods, which somehow communicate with db
module.exports = {
    add,
    findAll,
    findById,
    updatePostById,
    findByIdWithUserData,
    deletePost,
    checkIfPostToUser,
    leaveCommentToPost
}

async function add(post) {
    const [id] = await db("posts").insert(post);
    return id;
}

async function updatePostById(id, changes) {
    return await db("posts").where({id}).update(changes)
        .then(result => (result > 0 ? findById(id) : null));
}

async function findAll() {
    return db("posts");
}

async function findById(id) {
    return db("posts").where({id}).first();
}

async function findByIdWithUserData(id) {
    const post = await db('posts as p')
        .innerJoin("users as u", "p.user_id", "u.id")
        .select("u.nickname", "u.email", "p.title", "p.description", "p.publication_date")
        .where({"p.id": id}).first();
    const comments = await CommentModule.findByFilter({"post_id": id})
    return {...post, comments}
}

async function deletePost(id) {
    return db("posts").where({id}).first().del();
}

async function checkIfPostToUser(user_id, post_id) {
    return !!await db("posts").where({id: post_id}).andWhere({user_id}).first();
}

async function leaveCommentToPost(comment) {
    return CommentModule.add(comment);
}
