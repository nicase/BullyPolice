const Operation = require('../../Operation');
const Bully = require('../../../domain/Bully');

class CreateBully extends Operation {
  constructor({ bullyService }) {
    super();
    this.bullyService = bullyService;
  }

  async execute(bullyInfo) {
    const {
      SUCCESS, ERROR, VALIDATION_ERROR,
    } = this.outputs;

    try {
      const bullyModel = new Bully(bullyInfo);

      const bully = await this.bullyService.create(bullyModel);

      return this.emit(SUCCESS, bully);
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

CreateBully.setOutputs(['SUCCESS', 'ERROR', 'CONFLICT', 'VALIDATION_ERROR']);

module.exports = CreateBully;
