
class Bully {
  constructor(bullyData) {
    if (!(
      (bullyData.platform == 'tw' 
      || bullyData.platform == 'rd')
      && bullyData.language
      && bullyData.user
      && bullyData.data
      && bullyData.index
      && bullyData.link)) {
      throw new Error('ValidationError');
    }
    this.platform = bullyData.platform;
    this.language = bullyData.language;
    this.user = bullyData.user;
    this.data = bullyData.data;
    this.index = bullyData.index;
    this.link = bullyData.link;

    if (bullyData.id) {
      this.id = bullyData.id;
    }

    if (bullyData.createdAt) {
      this.createdAt = bullyData.createdAt;
    }
    if (bullyData.updatedAt) {
      this.updatedAt = bullyData.updatedAt;
    }
  }

  isAdmin() {
    return this.role === 'admin';
  }
}

module.exports = Bully;
