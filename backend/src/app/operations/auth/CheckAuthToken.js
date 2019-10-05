const Operation = require('../../Operation');

class CheckAuthToken extends Operation {
  constructor({ authService, userService }) {
    super();
    this.authService = authService;
    this.userService = userService;
  }

  async execute(token) {
    const { SUCCESS, INVALID_TOKEN } = this.outputs;

    try {
      const decoded = await this.authService.checkAuthToken(token);
      const user = await this.userService.getPopulate(decoded.userId);

      return this.emit(SUCCESS, user);
    } catch (error) {
      return this.emit(INVALID_TOKEN, error);
    }
  }
}

CheckAuthToken.setOutputs(['SUCCESS', 'INVALID_TOKEN']);

module.exports = CheckAuthToken;
