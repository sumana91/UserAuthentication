var bookshelf = require('../initialize');

var User = bookshelf.Model.extend({
  tableName: 'User',
  hasTimestamps : true,
  hidden: ['password']
});

module.exports = bookshelf.model('User',User)
