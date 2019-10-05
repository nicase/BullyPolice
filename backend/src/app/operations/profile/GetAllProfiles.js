const Operation = require('../../Operation');

class GetAllProfiles extends Operation {
  constructor({ profileService }) {
    super();
    this.profileService = profileService;
  }

  async execute(query) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      let profiles = await this.profileService.getAll(query);
      profiles = profiles.reverse();
      return this.emit(SUCCESS, profiles);
    } catch (error) {
      return this.emit(ERROR, error);
    }
  }
}

GetAllProfiles.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllProfiles;
