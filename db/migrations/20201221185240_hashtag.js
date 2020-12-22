
exports.up = function(knex) {
    return knex.schema.createTable('hashtag', table => {
      table.increments('id');
      table.string('label');
      table.integer('counter');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  };
  exports.down = function(knex) {
    return knex.schema.dropTable('hashtag');
  };
