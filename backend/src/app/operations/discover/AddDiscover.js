const Operation = require('../../Operation');
const request = require('request');

class AddDiscover extends Operation {
  constructor({ discoverService, userService }) {
    super();
    this.discoverService = discoverService;
    this.userService = userService;
  }

  async execute() {
    const {
      SUCCESS, ERROR, VALIDATION_ERROR,
    } = this.outputs;

    try {
      let users = await this.userService.getAll();
      users.forEach(user => {
        user.discover = 1;
        this.userService.update(user.id, user);
      });
      return this.emit(SUCCESS, {status: 'done'});

    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

AddDiscover.setOutputs(['SUCCESS', 'ERROR', 'CONFLICT', 'VALIDATION_ERROR']);

module.exports = AddDiscover;