'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FilterSchema extends Schema {
  up () {
    this.create('filters', (table) => {
      table.increments()
      table.string('title')
      table.timestamps()
    })
  }

  down () {
    this.drop('filters')
  }
}

module.exports = FilterSchema
