var bookshelf = require('../initialize');

var childUser = bookshelf.Model.extend({
  tableName: 'childUser'
});

module.exports = bookshelf.model('childUser',childUser)
