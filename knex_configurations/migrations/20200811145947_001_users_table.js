exports.up = function (knex) {
    return knex.schema.createTable('users', t => {
        t.increments('id').primary();
        t.string("nickname", 30).notNullable().unique();
        t.string("email", 255).notNullable().unique();
        t.string("password", 255).notNullable();
        t.date("creation_date").notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
