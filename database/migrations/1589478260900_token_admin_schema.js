'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TokenAdminSchema extends Schema {
  up () {
    this.create('admin_tokens', (table) => {
      table.increments()
      table.integer('admin_id').unsigned().references('id').inTable('admins').onDelete('CASCADE').onUpdate('CASCADE')
      table.string('country', 30)
      table.string('token', 255).notNullable().unique().index()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('admin_tokens')
  }
}

module.exports = TokenAdminSchema
