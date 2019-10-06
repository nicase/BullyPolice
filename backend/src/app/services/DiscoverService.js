const Discover = require('../../domain/Discover');

class DiscoverService {
  constructor({ discoverRepository }) {
    this.discoverRepository = discoverRepository;
  }

  async getAll(filter = {}) {
    try {
      const discovers = await this.discoverRepository.getAll(filter);
      return discovers.map((discover) => new Discover(discover));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async count(filter) {
    try {
      return await this.discoverRepository.count(filter);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(discoverInfo) {
    try {
      const discover = await this.discoverRepository.create(discoverInfo);
      return new Discover(discover);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async get(discoverId) {
    try {
      const discover = await this.discoverRepository.get(discoverId);
      return new Discover(discover);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPopulate(discoverId) {
    try {
      const discover = await this.discoverRepository.getPopulate(discoverId);
      return new Discover(discover);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(discoverId, discoverInfo) {
    try {
      const discoverData = discoverInfo;

      if ('updatedAt' in discoverData) {
        delete discoverData.updatedAt;
      }

      const discover = await this.discoverRepository.update(discoverId, discoverData);
      return new Discover(discover);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(discoverId) {
    try {
      await this.discoverRepository.delete(discoverId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async checkEmailExist(email) {
    try {
      const discovers = await this.discoverRepository.getAll({ email: email.toLowerCase() });
      return discovers.length !== 0;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = DiscoverService;
