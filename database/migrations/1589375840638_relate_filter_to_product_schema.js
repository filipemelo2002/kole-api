/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RelateFilterToProductSchema extends Schema {
  up() {
    this.table('products', (table) => {
      table
        .integer('filter_id')
        .unsigned()
        .references('id')
        .inTable('filters')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
  }

  down() {
    this.table('products', (table) => {
      table.dropColumn('filter_id');
    });
  }
}

module.exports = RelateFilterToProductSchema;
