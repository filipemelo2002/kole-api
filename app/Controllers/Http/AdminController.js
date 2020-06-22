const Admin = use('App/Models/Admin');
const DuplicatedEntryException = use(
  'App/Exceptions/DuplicatedEntryException',
);
class AdminController {
  async create({ request }) {
    try {
      const data = request.only(['email', 'password']);
      const admin = await Admin.create(data);
      return admin;
    } catch (err) {
      throw new DuplicatedEntryException();
    }
  }

  async show({ auth }) {
    const { uid } = auth.authenticator('api').jwtPayload;
    const admin = await Admin.find(uid);
    return admin;
  }

  async update({ request, auth }) {
    try {
      const { uid } = auth.authenticator('api').jwtPayload;
      const data = request.only(['email', 'password']);
      const admin = await Admin.find(uid);
      admin.merge(data);
      await admin.save();
      return admin;
    } catch (err) {
      throw new DuplicatedEntryException();
    }
  }

  async destroy({ auth, response }) {
    const { uid } = auth.authenticator('api').jwtPayload;
    const admin = await Admin.find(uid);
    await admin.delete();
    return response.send();
  }
}

module.exports = AdminController;
