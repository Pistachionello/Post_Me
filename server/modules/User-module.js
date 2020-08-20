//Import db access
const db = require("../db/dbConfig");

//Import required modules || attributes
const PostModule = require("./Post-module");

//Exporting methods, which somehow communicate with db
module.exports = {
    findById,
    findAllByFilter,
    findByFilterFirst,
    add,
    createPost,
    getUserPostById,
    checkIfPostToUser,
    getUserDataById,
    updateUser,
    updatePostById,
    deletePost,
    getAllUserPostsById
}

async function findById(id) {
    return db("users")
        .select("id", "nickname", "email", "creation_date")
        .where({id}).first();
}

async function getUserDataById (id) {
    return db("users as u")
        .select("id", "nickname", "email", "creation_date")
        .where({id}).first();
}

async function findAllByFilter(filter) {
    return db("users").where(filter);
}

async function findByFilterFirst(filter) {
    return db("users").where(filter).first();
}

async function add(user) {
    const [id] = await db("users").insert(user);
    return findById(id);
}

async function addPost(post) {
    return PostModule.add(post);
}

async function getAllUserPostsById(user_id) {
    return db("users as u")
        .innerJoin("posts as p", "u.id", "p.user_id")
        .select("u.nickname", "u.email", "p.id", "p.title", "p.description", "p.publication_date", "p.last_update_date")
        .where({"u.id": user_id});
}

async function getUserPostById(post_id) {
    return db("users as u")
        .innerJoin("posts as p", "u.id", "p.user_id")
        .select("u.nickname", "u.email", "p.title", "p.description", "p.publication_date", "p.last_update_date")
        .where({"p.id": post_id}).first();
}

async function updateUser (id, changes) {
    return await db("users").where({id}).update(changes)
        .then(result => (result > 0 ? findById(id) : null));
}

async function checkIfPostToUser(user_id, post_id) {
    return PostModule.checkIfPostToUser(user_id, post_id);
}

async function updatePostById(post_id, changes) {
    return PostModule.updatePostById(post_id, changes);
}

async function deletePost(post_id) {
    return PostModule.deletePost(post_id);
}

async function createPost(post) {
    const post_id = await addPost(post);
    return db("users as u")
        .innerJoin("posts as p", "u.id", "p.user_id")
        .select("u.nickname", "u.email", "p.title", "p.description", "p.publication_date")
        .where({"p.id": post_id}).first();
}
