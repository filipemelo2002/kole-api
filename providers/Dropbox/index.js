const fetch = require('isomorphic-fetch');
const DropBox = require('dropbox').Dropbox;

class Dropbox {
  constructor(Config) {
    this.path = '/kole';
    this.dbx = new DropBox({
      accessToken: Config.credentials.token,
      fetch,
    });
  }

  async folders() {
    let folders = await this.dbx.filesListFolder({
      path: '',
    });
    if (folders.entries.length > 0) return folders;

    folders = await this.dbx.filesCreateFolderV2({ path: this.path });
    return folders;
  }

  async upload(name, file) {
    const sanitizedPath = `${this.path}/${name}`;
    await this.dbx.filesUpload({
      contents: file,
      path: sanitizedPath,
      mode: {
        '.tag': 'overwrite',
      },
      autorename: true,
      mute: true,
    });
    const streamedFile = await this.dbx.sharingCreateSharedLink({
      path: sanitizedPath,
      short_url: false,
    });
    streamedFile.url = streamedFile.url.replace(
      'https://www.dropbox.com/s/',
      'https://www.dropbox.com/s/raw/',
    );
    return streamedFile.url;
  }

  async destroy(name) {
    const sanitizedPath = `${this.path}/${name}`;
    await this.dbx.filesDelete({ path: sanitizedPath });
  }
}

module.exports = Dropbox;
