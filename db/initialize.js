var knex = require('knex')({
  client: 'pg',
  connection: 'postgres://postgres:pogo@localhost:5432/userauthentication',
  searchPath: 'knex,public'
});
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry')
module.exports = bookshelf;
