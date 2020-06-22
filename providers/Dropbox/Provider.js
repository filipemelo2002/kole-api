const { ServiceProvider } = require('@adonisjs/fold');
const DropboxWrapper = require('./index');

class DropboxProvider extends ServiceProvider {
  register() {
    this.app.singleton('Dropbox', () => {
      const Config = this.app.use('Adonis/Src/Config');
      return new DropboxWrapper(Config._config.dropbox);
    });
  }
}

module.exports = DropboxProvider;
