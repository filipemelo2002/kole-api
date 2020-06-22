const { LogicalException } = require('@adonisjs/generic-exceptions');

class DuplicatedEntryException extends LogicalException {
  handle(error, { response }) {
    response.status(409).json({ message: 'Duplicated entry' });
  }
}

module.exports = DuplicatedEntryException;
