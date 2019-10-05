const Operation = require('../../Operation');
const Profile = require('../../../domain/Profile');

class CreateProfile extends Operation {
  constructor({ profileService }) {
    super();
    this.profileService = profileService;
  }

  async execute(profileInfo) {
    const {
      SUCCESS, ERROR, VALIDATION_ERROR,
    } = this.outputs;

    try {
      const profileModel = new Profile(profileInfo);

      const profile = await this.profileService.create(profileModel);

      return this.emit(SUCCESS, profile);
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

CreateProfile.setOutputs(['SUCCESS', 'ERROR', 'CONFLICT', 'VALIDATION_ERROR']);

module.exports = CreateProfile;
