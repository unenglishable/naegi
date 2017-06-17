var path = require('path');
var Branch = require(path.join(__dirname, '..', 'models', 'Branch'));


/**
 * POST /create
 */
exports.createPost = function(req, res, next) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('description', 'Description cannot be more than 140 characters').len({ max: 140 });
  req.assert('githubIssueNumber', 'Github issue number must be an integer').isInt();
  req.assert('parentId', 'Branch parent id must be an integer').isInt();

  // grab username, project name, and github issue number
  // to generate issue link
  var githubIssueLink = `https://github.com/${username}/${project}/issues/${req.body.githubIssueNumber}`;

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  new Branch({
    name: req.body.name,
    description: req.body.email,
    githubIssueNumber: req.body.githubIssueNumber,
    githubIssueLink: githubIssueLink
  }).save()
    .then(function(branch) {
        res.send(branch);
    })
    .catch(function(err) {
    });
};
