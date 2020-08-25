// Update with your config settings.
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
        client: 'postgresql',
        connection: {
            database: process.env.DATABASE_URL
        },
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

    // staging: {
    //   client: 'postgresql',
    //   connection: {
    //     database: 'my_db',
    //     user:     'username',
    //     password: 'password'
    //   },
    //   pool: {
    //     min: 2,
    //     max: 10
    //   },
    //   migrations: {
    //     tableName: 'knex_migrations'
    //   }
    // },
    //
};
