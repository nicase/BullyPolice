const Bully = require('../../domain/Bully');

class BullyService {
  constructor({ bullyRepository }) {
    this.bullyRepository = bullyRepository;
  }

  async getAll(filter = {}) {
    try {
      const bullys = await this.bullyRepository.getAll(filter);
      return bullys.map((bully) => new Bully(bully));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async count(filter) {
    try {
      return await this.bullyRepository.count(filter);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(bullyInfo) {
    try {
      const bully = await this.bullyRepository.create(bullyInfo);
      return new Bully(bully);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async get(bullyId) {
    try {
      const bully = await this.bullyRepository.get(bullyId);
      return new Bully(bully);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPopulate(bullyId) {
    try {
      const bully = await this.bullyRepository.getPopulate(bullyId);
      return new Bully(bully);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(bullyId, bullyInfo) {
    try {
      const bullyData = bullyInfo;

      if ('updatedAt' in bullyData) {
        delete bullyData.updatedAt;
      }

      const bully = await this.bullyRepository.update(bullyId, bullyData);
      return new Bully(bully);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(bullyId) {
    try {
      await this.bullyRepository.delete(bullyId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async checkEmailExist(email) {
    try {
      const bullys = await this.bullyRepository.getAll({ email: email.toLowerCase() });
      return bullys.length !== 0;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = BullyService;
