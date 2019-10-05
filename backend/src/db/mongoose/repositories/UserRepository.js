class UserRepository {
  constructor({ userDAO }) {
    this.userDAO = userDAO;
    this.options = { runValidators: true, new: true };
  }

  async getAll(filter) {
    try {
      return await this.userDAO.find(filter);
    } catch (error) {
      throw error;
    }
  }

  async count(options) {
    try {
      return await this.userDAO.countDocuments(options);
    } catch (error) {
      throw error;
    }
  }

  async create(userInfo) {
    try {
      return await this.userDAO.create(userInfo);
    } catch (error) {
      throw error;
    }
  }

  async get(userId) {
    try {
      const user = await this.userDAO.findById(userId);
      if (!user) {
        return Promise.reject(new Error('UserNotFoundError'));
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getPopulate(userId) {
    try {
      const user = await this.userDAO.findById(userId).populate('avatar');
      if (!user) {
        return Promise.reject(new Error('UserNotFoundError'));
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(userId, userInfo) {
    try {
      const user = await this.userDAO
        .findByIdAndUpdate(userId, userInfo, this.options);

      if (!user) {
        return Promise.reject(new Error('UserNotFoundError'));
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async delete(userId) {
    try {
      const user = await this.userDAO.findById(userId);
      if (!user) {
        return Promise.reject(new Error('UserNotFoundError'));
      }
      return await this.userDAO.deleteOne({ _id: userId });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
