/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Picture extends Model {
  product() {
    return this.belongsTo('App/Models/Product');
  }
}

module.exports = Picture;
