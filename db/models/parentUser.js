var bookshelf = require('../initialize');

var parentUser = bookshelf.Model.extend({
  tableName: 'parentUser'
  //hasTimestamps : true
});

module.exports = bookshelf.model('parentUser',parentUser)
