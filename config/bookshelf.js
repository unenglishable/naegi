var path = require('path');
var config = require(path.join(__dirname, '..', 'knexfile'))[ process.env.NODE_ENV || 'development' ];
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('virtuals');
bookshelf.plugin('visibility');

knex.migrate.latest();

module.exports = bookshelf;
