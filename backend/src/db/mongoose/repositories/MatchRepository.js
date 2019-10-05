class MatchRepository {
  constructor({ matchDAO }) {
    this.matchDAO = matchDAO;
    this.options = { runValidators: true, new: true };
  }

  async getAll(filter) {
    try {
      return await this.matchDAO.find(filter);
    } catch (error) {
      throw error;
    }
  }

  async count(options) {
    try {
      return await this.matchDAO.countDocuments(options);
    } catch (error) {
      throw error;
    }
  }

  async create(matchInfo) {
    try {
      return await this.matchDAO.create(matchInfo);
    } catch (error) {
      throw error;
    }
  }

  async get(matchId) {
    try {
      const match = await this.matchDAO.findById(matchId);
      if (!match) {
        return Promise.reject(new Error('MatchNotFoundError'));
      }
      return match;
    } catch (error) {
      throw error;
    }
  }

  async getPopulate(matchId) {
    try {
      const match = await this.matchDAO.findById(matchId).populate('avatar');
      if (!match) {
        return Promise.reject(new Error('MatchNotFoundError'));
      }
      return match;
    } catch (error) {
      throw error;
    }
  }

  async update(matchId, matchInfo) {
    try {
      const match = await this.matchDAO
        .findByIdAndUpdate(matchId, matchInfo, this.options);

      if (!match) {
        return Promise.reject(new Error('MatchNotFoundError'));
      }

      return match;
    } catch (error) {
      throw error;
    }
  }

  async delete(matchId) {
    try {
      const match = await this.matchDAO.findById(matchId);
      if (!match) {
        return Promise.reject(new Error('MatchNotFoundError'));
      }
      return await this.matchDAO.deleteOne({ _id: matchId });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MatchRepository;
