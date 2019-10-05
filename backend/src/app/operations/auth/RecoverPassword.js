const Operation = require('../../Operation');

class RecoverPassword extends Operation {
  constructor({ mailer, authService }) {
    super();
    this.authService = authService;
    this.mailer = mailer;
  }

  async execute(email) {
    const {
      SUCCESS, ERROR, NOT_FOUND, DISABLED_ACCOUNT,
    } = this.outputs;

    try {
      const auth = await this.authService.getByEmail(email);
      auth.checkEnabled();
      auth.generateToken();

      await this.authService.update(auth.id, { token: auth.token });
      await this.mailer.sendRecoverPasswordEmail(auth.email, {
        firstName: auth.user.firstName,
        lastName: auth.user.lastName,
        token: auth.token,
      });

      return this.emit(SUCCESS, 'You will receive an email with the instructions');
    } catch (error) {
      if (error.message === 'AuthNotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      if (error.message === 'DisabledAccountError') {
        return this.emit(DISABLED_ACCOUNT, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

RecoverPassword.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND', 'DISABLED_ACCOUNT']);

module.exports = RecoverPassword;
