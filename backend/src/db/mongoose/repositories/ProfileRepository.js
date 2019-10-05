class ProfileRepository {
  constructor({ profileDAO }) {
    this.profileDAO = profileDAO;
    this.options = { runValidators: true, new: true };
  }

  async getAll(filter) {
    try {
      return await this.profileDAO.find(filter);
    } catch (error) {
      throw error;
    }
  }

  async count(options) {
    try {
      return await this.profileDAO.countDocuments(options);
    } catch (error) {
      throw error;
    }
  }

  async create(profileInfo) {
    try {
      return await this.profileDAO.create(profileInfo);
    } catch (error) {
      throw error;
    }
  }

  async get(profileId) {
    try {
      const profile = await this.profileDAO.findById(profileId);
      if (!profile) {
        return Promise.reject(new Error('ProfileNotFoundError'));
      }
      return profile;
    } catch (error) {
      throw error;
    }
  }

  async getPopulate(profileId) {
    try {
      const profile = await this.profileDAO.findById(profileId); // .populate('avatar');
      if (!profile) {
        return Promise.reject(new Error('ProfileNotFoundError'));
      }
      return profile;
    } catch (error) {
      throw error;
    }
  }

  async update(profileId, profileInfo) {
    try {
      const profile = await this.profileDAO
        .findByIdAndUpdate(profileId, profileInfo, this.options);

      if (!profile) {
        return Promise.reject(new Error('ProfileNotFoundError'));
      }

      return profile;
    } catch (error) {
      throw error;
    }
  }

  async delete(profileId) {
    try {
      const profile = await this.profileDAO.findById(profileId);
      if (!profile) {
        return Promise.reject(new Error('ProfileNotFoundError'));
      }
      return await this.profileDAO.deleteOne({ _id: profileId });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProfileRepository;
