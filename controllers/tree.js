var path = require('path');
var Tree = Trees = require(path.join(__dirname, '..', 'models', 'Tree'));
var Branches = require(path.join(__dirname, '..', 'models', 'Branch'));

/**
 * POST /
 * create a tree
 */
exports.createPost = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.sendStatus(401);
  }

  req.assert('username', 'username cannot be blank').notEmpty();
  req.assert('repo', 'repo cannot be blank').notEmpty();
  req.assert('description', 'Description cannot be more than 140 characters').optional().len({ max: 140 });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  new Tree({
    user_id: req.user.get('id'),
    description: req.body.description,
    username: req.body.username,
    repo: req.body.repo
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
    res.send({ trees: trees });
  });
};

/**
 * GET /:id
 *
 * Find info for tree
 *
 */
exports.findGet = function(req, res, next) {
  req.checkParams('id', 'id must be an integer').isInt();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  Trees.where({ id: req.params.id }).fetch()
  .then(function(tree) {
    res.send(tree);
  });
};
