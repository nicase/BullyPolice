
class Discover {
  constructor(discoverData) {
    if (!(discoverData.nTweetsTotal
      && discoverData.nTweetsAnalys
      && discoverData.nPositive
      && discoverData.nNeutral
      && discoverData.nNegative)) {
      throw new Error('ValidationError');
    }
    this.nTweetsTotal = discoverData.nTweetsTotal;
    this.nTweetsAnalys = discoverData.nTweetsAnalys;
    this.nPositive = discoverData.nPositive;
    this.nNeutral = discoverData.nNeutral;
    this.nNegative = discoverData.nNegative;
    this.tweetsInterest = discoverData.tweetsInterest;

    if (discoverData.id) {
      this.id = discoverData.id;
    }

    if (discoverData.createdAt) {
      this.createdAt = discoverData.createdAt;
    }
    if (discoverData.updatedAt) {
      this.updatedAt = discoverData.updatedAt;
    }
  }

  isAdmin() {
    return this.role === 'admin';
  }
}

module.exports = Discover;
