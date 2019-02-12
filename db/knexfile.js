module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'userauthentication',
      user:     'postgres',
      password: 'pogo'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
