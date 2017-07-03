exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('trees', function(table) {
      table.string('githubRepoLink');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('trees', function(table) {
      table.dropColumn('githubRepoLink');
    })
  ]);
};
