//Import db access
const db = require("../db/dbConfig");

//Exporting methods, which somehow communicate with db
module.exports = {
    findById,
    findByFilter,
    findByFilterFirst,
    add
}

async function findById(id) {
    return db("comments").where({id}).first();
}

async function findByFilter(filter) {
    return db("comments").where(filter).orderBy("publication_date", "desc");
}

async function findByFilterFirst(filter) {
    return db("comments").where(filter).first();
}

async function add(comment) {
    const {rowCount} = await db("comments").insert(comment);
    return findById(rowCount);
}
