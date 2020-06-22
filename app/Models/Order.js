/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Order extends Model {
  user() {
    return this.hasOne('App/Models/User');
  }

  products() {
    return this.belongsToMany('App/Models/Product').withPivot([
      'qtd',
    ]);
  }
}

module.exports = Order;
