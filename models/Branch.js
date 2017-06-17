var path = require('path');
var bookshelf = require(path.join(__dirname, '..', 'config', 'bookshelf'));

var Branch = Branches = bookshelf.Model.extend({
  tableName: 'branches',
  hasTimestamps: true,

  parentBranch: function() {
    return this.belongsTo(Branch);
  },

  branches: function() {
    return this.hasMany(Branches);
  }
});

module.exports = Branch;
