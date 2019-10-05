const Operation = require('../../Operation');

class GenerateAuthToken extends Operation {
  constructor({ authService }) {
    super();
    this.authService = authService;
  }

  async execute(userId) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const token = await this.authService.generateAuthToken(userId);

      return this.emit(SUCCESS, token);
    } catch (error) {
      return this.emit(ERROR, error);
    }
  }
}

GenerateAuthToken.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GenerateAuthToken;
