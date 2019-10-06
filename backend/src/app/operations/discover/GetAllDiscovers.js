const Operation = require('../../Operation');

class GetAllDiscovers extends Operation {
  constructor({ discoverService }) {
    super();
    this.discoverService = discoverService;
  }

  async execute(query) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      let discovers = await this.discoverService.getAll(query);
      
      if (!discovers.length) {
        return this.emit(ERROR, discovers);
      }

      let remove = await this.discoverService.delete(discovers[0].id)
      return this.emit(SUCCESS, discovers);
    } catch (error) {
      return this.emit(ERROR, error);
    }
  }
}

GetAllDiscovers.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllDiscovers;
