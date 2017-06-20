exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('trees', function(table) {
      table.renameColumn('name', 'repo');
      table.string('username');
      table.dropColumn('githubRepoLink');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('trees', function(table) {
      table.string('githubRepoLink');
      table.renameColumn('repo', 'name');
      table.dropColumn('username');
    })
  ]);
};
