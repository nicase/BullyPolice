const Operation = require('../../Operation');
const Match = require('../../../domain/Match');

class CreateMatch extends Operation {
  constructor({ matchService }) {
    super();
    this.matchService = matchService;
  }

  async execute(matchInfo) {
    const {
      SUCCESS, ERROR, VALIDATION_ERROR,
    } = this.outputs;

    try {
      const matchModel = new Match(matchInfo);

      const match = await this.matchService.create(matchModel);

      return this.emit(SUCCESS, match);
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

CreateMatch.setOutputs(['SUCCESS', 'ERROR', 'CONFLICT', 'VALIDATION_ERROR']);

module.exports = CreateMatch;
