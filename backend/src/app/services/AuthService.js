const jwt = require('jsonwebtoken');

const Auth = require('../../domain/Auth');

class AuthService {
  constructor({ authRepository, config }) {
    this.authRepository = authRepository;
    this.config = config;
  }

  async create(authInfo) {
    try {
      const auth = await this.authRepository.create(authInfo);
      return new Auth(auth);
    } catch (error) {
      throw new Error('AuthCreateError');
    }
  }

  async update(authId, authInfo) {
    try {
      const auth = await this.authRepository.update(authId, authInfo);
      return new Auth(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getByEmail(email) {
    try {
      const auth = await this.authRepository.getOne({ email: email.toLowerCase() });
      return new Auth(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getByUserId(user) {
    try {
      const auth = await this.authRepository.getOne({ user });
      return new Auth(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getByToken(token) {
    try {
      const auth = await this.authRepository.getOne({ token });
      return new Auth(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async generateAuthToken(userId) {
    try {
      return await jwt.sign({
        userId,
      }, this.config.server.secret, { expiresIn: '7d' });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async checkAuthToken(token) {
    try {
      return await jwt.verify(token, this.config.server.secret);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async incrementLogInCount(authId) {
    try {
      await this.authRepository.update(authId, { $inc: { signInCount: 1 } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteByUserId(user) {
    try {
      return await this.authRepository.deleteOne({ user });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = AuthService;
