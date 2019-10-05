const Match = require('../../domain/Match');

class MatchService {
  constructor({ matchRepository }) {
    this.matchRepository = matchRepository;
  }

  async getAll(filter = {}) {
    try {
      const matchs = await this.matchRepository.getAll(filter);
      return matchs.map((match) => new Match(match));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async count(filter) {
    try {
      return await this.matchRepository.count(filter);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(matchInfo) {
    try {
      const match = await this.matchRepository.create(matchInfo);
      return new Match(match);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async get(matchId) {
    try {
      const match = await this.matchRepository.get(matchId);
      return new Match(match);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPopulate(matchId) {
    try {
      const match = await this.matchRepository.getPopulate(matchId);
      return new Match(match);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(matchId, matchInfo) {
    try {
      const matchData = matchInfo;

      if ('updatedAt' in matchData) {
        delete matchData.updatedAt;
      }

      const match = await this.matchRepository.update(matchId, matchData);
      return new Match(match);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(matchId) {
    try {
      await this.matchRepository.delete(matchId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async checkEmailExist(email) {
    try {
      const matchs = await this.matchRepository.getAll({ email: email.toLowerCase() });
      return matchs.length !== 0;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = MatchService;
