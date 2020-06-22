/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AuthAdmin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth }, next) {
    try {
      await auth.authenticator('api').check();
      const refresh_token = request.header('refresh_token');

      if (!refresh_token) {
        return response
          .status(400)
          .json({ message: 'missing refresh token' });
      }

      const refreshed_token = await auth
        .authenticator('api')
        .newRefreshToken()
        .generateForRefreshToken(refresh_token);
      const admin = auth.authenticator('api').user;
      const token = auth.authenticator('api').getAuthHeader();
      await admin
        .tokens()
        .where('token', token)
        .update({ is_revoked: true });

      response.header('token', refreshed_token.token);
      response.header('refresh_token', refreshed_token.refreshToken);
    } catch (err) {
      return response
        .status(400)
        .json({ message: 'unauthorized access' });
    }
    await next();
  }
}

module.exports = AuthAdmin;
