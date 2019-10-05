const userDeepQuery = { path: 'user', populate: { path: 'avatar' } };

class AuthRepository {
  constructor({ authDAO }) {
    this.authDAO = authDAO;
    this.options = { runValidators: true, new: true };
  }

  async create(authInfo) {
    try {
      return await this.authDAO.create(authInfo);
    } catch (error) {
      throw error;
    }
  }

  async getOne(filter) {
    try {
      const auth = await this.authDAO.findOne(filter).populate(userDeepQuery);
      if (!auth) {
        return Promise.reject(new Error('AuthNotFoundError'));
      }
      return auth;
    } catch (error) {
      throw error;
    }
  }

  async update(authId, authInfo) {
    try {
      const auth = await this.authDAO
        .findByIdAndUpdate(authId, authInfo, this.options);

      if (!auth) {
        return Promise.reject(new Error('AuthNotFoundError'));
      }

      return auth;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(filter) {
    try {
      const auth = await this.authDAO.findOne(filter);
      if (!auth) {
        return Promise.reject(new Error('AuthNotFoundError'));
      }
      return await this.authDAO.deleteOne(filter);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthRepository;
