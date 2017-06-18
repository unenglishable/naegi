var path = require('path');
var Tree = Trees = require(path.join(__dirname, '..', 'models', 'Tree'));
var Branches = require(path.join(__dirname, '..', 'models', 'Branch'));

/**
 * POST /
 * create a tree
 */
exports.createPost = function(req, res, next) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('description', 'Description cannot be more than 140 characters').optional().len({ max: 140 });
  req.assert('githubRepoLink', 'Github repo link is not a URL').isURL();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  new Tree({
    name: req.body.name,
    description: req.body.email,
    githubRepoLink: req.body.githubRepoLink
  }).save()
    .then(function(tree) {
        res.send(tree);
    });
};

/**
 * GET /
 *
 * Get all trees
 *
 */
exports.allGet = function(req, res, next) {
  Trees.fetchAll()
  .then(function(trees) {
    res.send(trees);
  });
};

/**
 * GET /:id
 *
 * Get all branches for a tree
 *
 */
exports.branchesGet = function(req, res, next) {
  Branches.where({ treeId: req.params.id })
  .fetch()
  .then(function(branches) {
    res.send(branches);
  });
};
