class DiscoverRepository {
  constructor({ discoverDAO }) {
    this.discoverDAO = discoverDAO;
    this.options = { runValidators: true, new: true };
  }

  async getAll(filter) {
    try {
      return await this.discoverDAO.find(filter).populate('user');
    } catch (error) {
      throw error;
    }
  }

  async count(options) {
    try {
      return await this.discoverDAO.countDocuments(options);
    } catch (error) {
      throw error;
    }
  }

  async create(discoverInfo) {
    try {
      return await this.discoverDAO.create(discoverInfo);
    } catch (error) {
      throw error;
    }
  }

  async get(discoverId) {
    try {
      const discover = await this.discoverDAO.findById(discoverId);
      if (!discover) {
        return Promise.reject(new Error('DiscoverNotFoundError'));
      }
      return discover;
    } catch (error) {
      throw error;
    }
  }

  async getPopulate(discoverId) {
    try {
      const discover = await this.discoverDAO.findById(discoverId).populate('profile');
      if (!discover) {
        return Promise.reject(new Error('DiscoverNotFoundError'));
      }
      return discover;
    } catch (error) {
      throw error;
    }
  }

  async update(discoverId, discoverInfo) {
    try {
      const discover = await this.discoverDAO
        .findByIdAndUpdate(discoverId, discoverInfo, this.options);

      if (!discover) {
        return Promise.reject(new Error('DiscoverNotFoundError'));
      }

      return discover;
    } catch (error) {
      throw error;
    }
  }

  async delete(discoverId) {
    try {
      const discover = await this.discoverDAO.findById(discoverId);
      if (!discover) {
        return Promise.reject(new Error('DiscoverNotFoundError'));
      }
      return await this.discoverDAO.deleteOne({ _id: discoverId });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DiscoverRepository;
