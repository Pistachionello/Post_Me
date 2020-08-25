module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './db/test-db.sqlite3'
        },
        migrations: {
            directory: "./knex_configurations/migrations"
        },
        seeds: {
            directory: "./knex_configurations/seeds"
        },
        useNullAsDefault: true
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: "./knex_configurations/migrations"
        },
        seeds: {
            directory: "./knex_configurations/seeds"
        },
    }
};
