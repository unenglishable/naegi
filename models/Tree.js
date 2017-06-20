var path = require('path');
var bookshelf = require(path.join(__dirname, '..', 'config', 'bookshelf'));
var Branches = require(path.join(__dirname, 'Branch'));

var Tree = Trees = bookshelf.Model.extend({
  tableName: 'trees',
  hasTimestamps: true,

  githubRepoLink: function() {
    var username = this.get('username');
    var repo = this.get('repo');
    return `https://github.com/${username}/${repo}`;
  },
  branches: function() {
    return this.hasMany(Branches);
  }
});

module.exports = Tree;
