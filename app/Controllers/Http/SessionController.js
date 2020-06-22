class SessionController {
  async create({ request, auth }) {
    const { email, password } = request.post(['email', 'password']);
    const token = await auth
      .withRefreshToken()
      .attempt(email, password);

    return token;
  }
}

module.exports = SessionController;
