const Operation = require('../../Operation');

class ResetPassword extends Operation {
  constructor({ authService }) {
    super();
    this.authService = authService;
  }

  async execute(token, newPassword) {
    const {
      SUCCESS, ERROR, BAD_TOKEN, VALIDATION_ERROR,
    } = this.outputs;

    try {
      const oldAuth = await this.authService.getByToken(token);
      oldAuth.checkAndSetPassword(newPassword);
      await this.authService.update(oldAuth.id, { token: null, password: oldAuth.password });

      return this.emit(SUCCESS, oldAuth);
    } catch (error) {
      if (error.message === 'InvalidToken') {
        return this.emit(BAD_TOKEN, error);
      }
      if (error.message === 'BadPasswordError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

ResetPassword.setOutputs(['SUCCESS', 'ERROR', 'BAD_TOKEN', 'VALIDATION_ERROR']);

module.exports = ResetPassword;
