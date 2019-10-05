class BullyRepository {
  constructor({ bullyDAO }) {
    this.bullyDAO = bullyDAO;
    this.options = { runValidators: true, new: true };
  }

  async getAll(filter) {
    try {
      return await this.bullyDAO.find(filter).populate('user');
    } catch (error) {
      throw error;
    }
  }

  async count(options) {
    try {
      return await this.bullyDAO.countDocuments(options);
    } catch (error) {
      throw error;
    }
  }

  async create(bullyInfo) {
    try {
      return await this.bullyDAO.create(bullyInfo);
    } catch (error) {
      throw error;
    }
  }

  async get(bullyId) {
    try {
      const bully = await this.bullyDAO.findById(bullyId);
      if (!bully) {
        return Promise.reject(new Error('BullyNotFoundError'));
      }
      return bully;
    } catch (error) {
      throw error;
    }
  }

  async getPopulate(bullyId) {
    try {
      const bully = await this.bullyDAO.findById(bullyId).populate('profile');
      if (!bully) {
        return Promise.reject(new Error('BullyNotFoundError'));
      }
      return bully;
    } catch (error) {
      throw error;
    }
  }

  async update(bullyId, bullyInfo) {
    try {
      const bully = await this.bullyDAO
        .findByIdAndUpdate(bullyId, bullyInfo, this.options);

      if (!bully) {
        return Promise.reject(new Error('BullyNotFoundError'));
      }

      return bully;
    } catch (error) {
      throw error;
    }
  }

  async delete(bullyId) {
    try {
      const bully = await this.bullyDAO.findById(bullyId);
      if (!bully) {
        return Promise.reject(new Error('BullyNotFoundError'));
      }
      return await this.bullyDAO.deleteOne({ _id: bullyId });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BullyRepository;
