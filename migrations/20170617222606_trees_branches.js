exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('branches', function(table) {
      table.integer('parentId').unsigned().alter();
      table.integer('treeId').unsigned().unique();
      table.foreign('treeId').references('id').inTable('trees');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('branches', function(table) {
      table.integer('parentId').alter();
      table.dropColumn('treeId');
    })
  ]);
};
