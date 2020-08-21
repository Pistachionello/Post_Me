exports.up = function (knex) {
    return knex.schema.createTable('comments', t => {
        t.increments('id').primary();
        t.integer("post_id").unsigned().notNullable().references("id").inTable("posts");
        t.string("description", 500).notNullable();
        t.date("publication_date").notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('comments');
};
