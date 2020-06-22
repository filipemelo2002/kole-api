/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Hash = use('Hash');
class Admin extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (adminInstance) => {
      if (adminInstance.dirty.password) {
        adminInstance.password = await Hash.make(
          adminInstance.password,
        );
      }
    });
  }

  tokens() {
    return this.hasMany('App/Models/AdminToken');
  }
}

module.exports = Admin;
