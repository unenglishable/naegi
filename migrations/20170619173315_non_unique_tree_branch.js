exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('branches', function(table) {
      table.dropUnique('treeId');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('branches', function(table) {
      table.unique('treeId');
    })
  ]);
};
