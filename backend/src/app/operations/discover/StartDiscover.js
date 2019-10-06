const Operation = require('../../Operation');
const request = require('request');

class StartDiscover extends Operation {
  constructor({ discoverService }) {
    super();
    this.discoverService = discoverService;
  }

  async execute(discoverInfo) {
    const {
      SUCCESS, ERROR, VALIDATION_ERROR,
    } = this.outputs;

    try {
      request.post('http://localhost:5000/', {
        json: discoverInfo
      }, (error, res, body) => {
        if (error) {
          console.error(error)
          return
        }
      })

      return this.emit(SUCCESS, discoverInfo);
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