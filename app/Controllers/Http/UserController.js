const User = use('App/Models/User');
const Address = use('App/Models/UserAddress');
const DuplicatedEntryException = use(
  'App/Exceptions/DuplicatedEntryException',
);
class UserController {
  async create({ request }) {
    try {
      const credentials = request.only([
        'name',
        'email',
        'password',
        'phone',
      ]);
      const data = request.only([
        'country',
        'address',
        'city',
        'postal',
        'state',
      ]);

      const user = await User.create(credentials);
      data.user_id = user.id;
      const address = await Address.create(data);

      return { user, address };
    } catch (err) {
      throw new DuplicatedEntryException();
    }
  }

  async show({ auth }) {
    const { uid } = auth.jwtPayload;
    const user = await User.find(uid);
    await user.load('address');
    user.password = undefined;
    return user;
  }

  async update({ request, auth, response }) {
    const { uid } = auth.jwtPayload;
    if (!uid) {
      return response
        .status(400)
        .json({ message: 'missing User id' });
    }
    try {
      const userData = request.only([
        'name',
        'email',
        'password',
        'phone',
      ]);
      const addressData = request.only([
        'country',
        'address',
        'city',
        'postal',
        'state',
      ]);

      const user = await User.find(uid);
      user.merge(userData);
      await user.save(addressData);

      const address = await Address.findBy('user_id', uid);
      address.merge();

      await address.save();
      return { user, address };
    } catch (err) {
      throw new DuplicatedEntryException();
    }
  }

  async destroy({ auth, response }) {
    try {
      const { uid } = auth.jwtPayload;
      const user = await User.find(uid);
      if (!user) {
        return response
          .status(404)
          .send({ message: 'User not found' });
      }
      await user.delete();
    } catch (err) {
      return response
        .status(403)
        .send({ message: 'operation not permited' });
    }
    return response.send();
  }
}

module.exports = UserController;
