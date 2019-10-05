const Operation = require('../../Operation');

class CheckAuthCredentials extends Operation {
  constructor({ authService }) {
    super();
    this.authService = authService;
  }

  async execute(email, password) {
    const {
      SUCCESS, ERROR, BAD_EMAIL, BAD_PASSWORD,
    } = this.outputs;

    try {
      const auth = await this.authService.getByEmail(email);
      auth.validatePassword(password);
      await this.authService.incrementLogInCount(auth.id);

      return this.emit(SUCCESS, auth.user);
    } catch (error) {
      if (error.message === 'AuthNotFoundError') {
        return this.emit(BAD_EMAIL, error);
      }
      if (error.message === 'InvalidPasswordError') {
        return this.emit(BAD_PASSWORD, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

CheckAuthCredentials.setOutputs(['SUCCESS', 'ERROR', 'BAD_EMAIL', 'BAD_PASSWORD']);

module.exports = CheckAuthCredentials;
