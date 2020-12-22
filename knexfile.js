// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'express_app',
      // ubuntu users remember to add username and password
      username: 'harsha',
      password: '1234',
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

};

