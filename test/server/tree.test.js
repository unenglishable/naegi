var path = require('path');
var request = require('supertest');
var server = require(path.join(__dirname, '..', '..', 'server'));
var Tree = require(path.join(__dirname, '..', '..', 'models', 'Tree'));
var expect = require('chai').expect;

// Trees
describe('POST /trees', function() {
  it('should create a tree', function() {
    var treeOptions = {
      username: 'Dizzney',
      repo: 'Rattatatouille',
      description: 'A movie about a rat, who can cook!'
    };
    return request(server)
    .post('/trees')
    .send(treeOptions)
    .expect(200)
    .then(response => {
      expect(response.body).to.exist;
      expect(response.body).to.have.all.keys([
        'id',
        'created_at',
        'updated_at',
        'username',
        'repo',
        'description'
      ]);

      expect(response.body.id).to.be.a('number');
      expect(response.body.username).to.equal(treeOptions.username);
      expect(response.body.repo).to.equal(treeOptions.repo);
      expect(response.body.description).to.equal(treeOptions.description);
    });
  });
});

describe('GET /trees', function() {
  var treeOptions = {
    username: 'Dizzney',
    repo: 'Rattatatouille',
    description: 'A movie about a rat, who can cook!'
  };

  before('create a tree', function() {
    return request(server)
    .post('/trees')
    .send(treeOptions)
    .then(response => {
      treeOptions.id = response.body.id;
    });
  });
  it('should get a tree', function() {
    return request(server)
    .get(`/trees/${treeOptions.id}`)
    .expect(200)
    .then(response => {
      expect(response.body).to.exist;
      expect(response.body).to.have.all.keys([
        'id',
        'created_at',
        'updated_at',
        'username',
        'repo',
        'description'
      ]);

      expect(response.body.id).to.be.a('number');
      expect(response.body.username).to.equal(treeOptions.username);
      expect(response.body.repo).to.equal(treeOptions.repo);
      expect(response.body.description).to.equal(treeOptions.description);
    });
  });
  after('delete created tree', function() {
    console.log('treeid', treeOptions.id);
    return Tree.where({ id: treeOptions.id })
    .destroy();
  });
});
