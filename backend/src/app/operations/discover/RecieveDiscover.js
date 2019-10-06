const Operation = require('../../Operation');
const Discover = require('../../../domain/Discover');

class RecieveDiscover extends Operation {
  constructor({ discoverService }) {
    super();
    this.discoverService = discoverService;
  }

  async execute(discoverInfo) {
    const {
      SUCCESS, ERROR, VALIDATION_ERROR,
    } = this.outputs;

    try {
      const discoverModel = new Discover(discoverInfo);

      const discover = await this.discoverService.create(discoverModel);

      return this.emit(SUCCESS, discover);
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

RecieveDiscover.setOutputs(['SUCCESS', 'ERROR', 'CONFLICT', 'VALIDATION_ERROR']);

module.exports = RecieveDiscover;
