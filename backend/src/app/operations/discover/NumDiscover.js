const Operation = require('../../Operation');

class NumDiscover extends Operation {
  constructor({ userService }) {
    super();
    this.userService = userService;
  }

  async execute(query) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      let discovers = await this.userService.get(query.id);
      
      return this.emit(SUCCESS, discovers.discover);
    } catch (error) {
      return this.emit(ERROR, error);
    }
  }
}

NumDiscover.setOutputs(['SUCCESS', 'ERROR']);

module.exports = NumDiscover;
