var path = require('path');
var bookshelf = require(path.join(__dirname, '..', 'config', 'bookshelf'));
var Tree = require(path.join(__dirname, 'Tree'));

var Branch = Branches = bookshelf.Model.extend({
  tableName: 'branches',
  hasTimestamps: true,

  tree: function() {
    return this.belongsTo(Tree);
  },

  parentBranch: function() {
    return this.belongsTo(Branch);
  },

  branches: function() {
    return this.hasMany(Branches);
  }
});

module.exports = Branch;
