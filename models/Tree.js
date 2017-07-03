var path = require('path');
var bookshelf = require(path.join(__dirname, '..', 'config', 'bookshelf'));
var Branches = require(path.join(__dirname, 'Branch'));

var Tree = Trees = bookshelf.Model.extend({
  tableName: 'trees',
  hasTimestamps: true,

  branches: function() {
    return this.hasMany(Branches);
  },
  initialize: function() {
    this.on('saving', this.generateGithubRepoLink, this);
  },
  generateGithubRepoLink: function(model, attrs, options) {
    var repo = attrs.repo || model.get('repo');
    var username = attrs.username || model.get('username');

    this.set({ githubRepoLink: `https://github.com/${username}/${repo}` });
  }
});

module.exports = Tree;
