const Profile = require('../../domain/Profile');

class ProfileService {
  constructor({ profileRepository }) {
    this.profileRepository = profileRepository;
  }

  async getAll(filter = {}) {
    try {
      const profiles = await this.profileRepository.getAll(filter);
      return profiles.map((profile) => new Profile(profile));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async count(filter) {
    try {
      return await this.profileRepository.count(filter);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(profileInfo) {
    try {
      const profile = await this.profileRepository.create(profileInfo);
      return new Profile(profile);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async get(profileId) {
    try {
      const profile = await this.profileRepository.get(profileId);
      return new Profile(profile);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPopulate(profileId) {
    try {
      const profile = await this.profileRepository.getPopulate(profileId);
      return new Profile(profile);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(profileId, profileInfo) {
    try {
      const profileData = profileInfo;

      if ('updatedAt' in profileData) {
        delete profileData.updatedAt;
      }

      const profile = await this.profileRepository.update(profileId, profileData);
      return new Profile(profile);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(profileId) {
    try {
      await this.profileRepository.delete(profileId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async checkEmailExist(email) {
    try {
      const profiles = await this.profileRepository.getAll({ email: email.toLowerCase() });
      return profiles.length !== 0;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = ProfileService;
