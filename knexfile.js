module.exports = {
    development: {
        client: 'pg',
        connection: {
            database: "dyago",
            host: "localhost",
            user: "dyago",
            password: "",
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
