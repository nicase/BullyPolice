const User = require('../../domain/User');

class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async getAll(filter = {}) {
    try {
      const users = await this.userRepository.getAll(filter);
      return users.map((user) => new User(user));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async count(filter) {
    try {
      return await this.userRepository.count(filter);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(userInfo) {
    try {
      const user = await this.userRepository.create(userInfo);
      return new User(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async get(userId) {
    try {
      const user = await this.userRepository.get(userId);
      return new User(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPopulate(userId) {
    try {
      const user = await this.userRepository.getPopulate(userId);
      return new User(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(userId, userInfo) {
    try {
      const userData = userInfo;

      if ('updatedAt' in userData) {
        delete userData.updatedAt;
      }

      const user = await this.userRepository.update(userId, userData);
      return new User(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(userId) {
    try {
      await this.userRepository.delete(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async checkEmailExist(email) {
    try {
      const users = await this.userRepository.getAll({ email: email.toLowerCase() });
      return users.length !== 0;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserService;
