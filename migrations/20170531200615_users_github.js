exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('users', function(table) {
      table.string('github').unique();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('users', function(table) {
      table.dropColumn('github');
    })
  ]);
};
