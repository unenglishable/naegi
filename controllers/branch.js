var path = require('path');
var Branch = Branches = require(path.join(__dirname, '..', 'models', 'Branch'));
var Tree = require(path.join(__dirname, '..', 'models', 'Tree'));


/**
 * POST /
 */
exports.createPost = function(req, res, next) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('description', 'Description cannot be more than 140 characters').optional().len({ max: 140 });
  req.assert('githubIssueNumber', 'Github issue number must be an integer').isInt();
  req.assert('parentId', 'Branch parent id must be an integer').optional().isInt();
  req.assert('treeId', 'Branch tree id must be an integer').isInt();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  Tree.where({ id: req.body.treeId }).fetch()
  .then(function(tree) {
    var githubRepoLink = tree.get('githubRepoLink');

    // grab username, project name, and github issue number
    // to generate issue link
    var githubIssueLink = `${githubRepoLink}/issues/${req.body.githubIssueNumber}`;

    return new Branch({
      name: req.body.name,
      description: req.body.email,
      parentId: req.body.parentId,
      treeId: req.body.treeId,
      githubIssueNumber: req.body.githubIssueNumber,
      githubIssueLink: githubIssueLink
    })
    .save()
    .then(function(branch) {
      res.send(branch);
    })
    .catch(function(err) {
    });
  })
  .catch(Tree.NotFoundError, function() {
    return res.status(400).send({ msg: `Tree ${req.body.treeId} not found` });
  });
};

/**
 * GET /branches
 *
 * Get branches by tree id
 *
 */
exports.byTreeGet = function(req, res, next) {
  req.assert('treeId', 'Tree id must be an integer').isInt();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  Branches.where({ treeId: req.query.treeId })
  .fetch()
  .then(function(branches) {
    res.send(branches);
  });
};

/**
 * GET /api/branches/:id
 *
 * Get a branch by id
 *
 */
exports.findGet = function(req, res, next) {
  req.checkParams('id', 'Branch id must be an integer').isInt();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  Branches.where({ id: req.params.id })
  .fetch()
  .then(function(branch) {
    res.send({ branch });
  });
};
