var path = require('path');
var request = require('supertest');
var server = require(path.join(__dirname, '..', '..', 'server'));
var expect = require('chai').expect;

describe('GET /', function() {
  it('should render ok', function(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
});

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
