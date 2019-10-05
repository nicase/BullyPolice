const Operation = require('../../Operation');
const User = require('../../../domain/User');
const Auth = require('../../../domain/Auth');

class SignUp extends Operation {
  constructor({ userService, authService }) {
    super();
    this.userService = userService;
    this.authService = authService;
  }

  async execute(userInfo) {
    const {
      SUCCESS, ERROR, ALREADY_REGISTERED, VALIDATION_ERROR,
    } = this.outputs;

    try {
      const userModel = new User(Object.assign(userInfo, { role: 'basic' }));
      const authModel = new Auth(userInfo);

      if (await this.userService.checkEmailExist(userInfo.email)) {
        return this.emit(ALREADY_REGISTERED, userInfo.email);
      }

      authModel.checkAndSetPassword();
      this.user = await this.userService.create(userModel);
      authModel.user = this.user.id;
      await this.authService.create(authModel);

      return this.emit(SUCCESS, this.user);
    } catch (error) {
      if (error.message === 'ValidationError' || error.message === 'BadEmailError'
        || error.message === 'BadPasswordError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      if (error.message === 'AuthCreateError') {
        await this.userService.delete(this.user.id);
      }
      return this.emit(ERROR, error);
    }
  }
}

SignUp.setOutputs(['SUCCESS', 'ERROR', 'ALREADY_REGISTERED', 'VALIDATION_ERROR']);

module.exports = SignUp;
