exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('branches', function(table) {
      table.increments('id').primary();
      table.timestamps();
      table.string('name');
      table.string('description');
      table.integer('githubIssueNumber').unique();
      table.string('githubIssueLink').unique();
      table.integer('parentId').unique().references('branches.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('branches')
  ]);
};
