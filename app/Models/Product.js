/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Product extends Model {
  filter() {
    return this.belongsTo('App/Models/Filter');
  }

  orders() {
    return this.belongsToMany('App/Models/Order');
  }

  pictures() {
    return this.hasMany('App/Models/Picture');
  }
}

module.exports = Product;
