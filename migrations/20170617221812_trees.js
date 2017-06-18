exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('trees', function(table) {
      table.increments('id').primary();
      table.timestamps();
      table.string('name');
      table.string('description');
      table.string('githubRepoLink');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('trees')
  ]);
};
