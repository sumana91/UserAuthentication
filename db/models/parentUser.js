var bookshelf = require('../initialize');

var parentUser = bookshelf.Model.extend({
  tableName: 'parentUser'
});

module.exports = bookshelf.model('parentUser',parentUser)
