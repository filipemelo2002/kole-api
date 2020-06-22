class AdminSessionController {
  async create({ request, auth }) {
    const { email, password } = request.only(['email', 'password']);
    const token = await auth
      .authenticator('api')
      .withRefreshToken()
      .attempt(email, password);
    return token;
  }
}

module.exports = AdminSessionController;
