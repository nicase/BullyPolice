const Operation = require('../../Operation');
const request = require('request');

class StartDiscover extends Operation {
  constructor({ discoverService, userService }) {
    super();
    this.discoverService = discoverService;
    this.userService = userService;
  }

  async execute(discoverInfo) {
    const {
      SUCCESS, ERROR, VALIDATION_ERROR,
    } = this.outputs;

    try {
      let user = await this.userService.get(discoverInfo.user);
      const numD = user.discover;

      if (numD > 0){
        user.discover = numD -1;
        let user2 = await this.userService.update(discoverInfo.user, user);
        request.post('http://localhost:5000/', {
          json: discoverInfo
        }, (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
        })
      return this.emit(SUCCESS, user2);
      }
      if (numD == 0) {
        return this.emit(SUCCESS, {status: 'No more discoveries for today'});
      }
      
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

StartDiscover.setOutputs(['SUCCESS', 'ERROR', 'CONFLICT', 'VALIDATION_ERROR']);

module.exports = StartDiscover;