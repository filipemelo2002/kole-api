/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserAddressSchema extends Schema {
  up() {
    this.create('user_addresses', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('country', 30).notNullable();
      table.string('address', 100).notNullable();
      table.string('city', 100).notNullable();
      table.string('postal', 15).notNullable();
      table.string('state', 100).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('user_addresses');
  }
}

module.exports = UserAddressSchema;
