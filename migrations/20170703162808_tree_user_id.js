exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('trees', function(table) {
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('id').inTable('users');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('trees', function(table) {
      table.dropColumn('user_id');
    })
  ]);
};
