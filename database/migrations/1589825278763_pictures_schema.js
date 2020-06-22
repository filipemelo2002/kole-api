/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PicturesSchema extends Schema {
  up() {
    this.create('pictures', (table) => {
      table.increments();
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('src').notNullable();
      table.string('path').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('pictures');
  }
}

module.exports = PicturesSchema;
