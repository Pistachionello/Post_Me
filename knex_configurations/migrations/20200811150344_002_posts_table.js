exports.up = function (knex) {
    return knex.schema.createTable('posts', t => {
        t.increments('id').primary();
        t.integer('user_id')
            .unsigned()
            .notNullable()
            .references("id").inTable("users")
            .onDelete("CASCADE");
        t.string("title", 255).notNullable();
        t.string("description", 5000).notNullable();
        t.date("publication_date").notNullable();
        t.date("last_update_date").notNullable();

    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('posts');
};
