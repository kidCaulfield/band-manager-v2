const aws = require('./config');

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'band_manager_v2',
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations'
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
  production: {
    client: 'pg',
    connection: {
      database: aws.endpoint,
      user:     aws.username,
      password: aws.password
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations'
    }
  }
};


  //   staging: {
  //     client: 'postgresql',
  //     connection: {
  //       database: 'my_db',
  //       user:     'username',
  //       password: 'password'
  //     },
  //     pool: {
  //       min: 2,
  //       max: 10
  //     },
  //     migrations: {
  //       tableName: 'knex_migrations'
  //     }
  //   },
  
  