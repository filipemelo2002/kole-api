'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderProductSchema extends Schema {
  up () {
    this.create('order_product', (table) => {
      table.increments()
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('qtd').notNullable().defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('order_product')
  }
}

module.exports = OrderProductSchema
