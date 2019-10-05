const Operation = require('../../Operation');

class GetAllBullys extends Operation {
  constructor({ bullyService }) {
    super();
    this.bullyService = bullyService;
  }

  async execute(query) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      let bullys = await this.bullyService.getAll(query);
      bullys = bullys.reverse();
      return this.emit(SUCCESS, bullys);
    } catch (error) {
      return this.emit(ERROR, error);
    }
  }
}

GetAllBullys.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllBullys;
