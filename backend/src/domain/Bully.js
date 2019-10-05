
class Bully {
  constructor(bullyData) {
    console.log(bullyData);
    if (!(bullyData.platform
      && bullyData.language
      && bullyData.user
      && bullyData.data)) {
      throw new Error('ValidationError');
    }
    this.platform = bullyData.platform;
    this.language = bullyData.language;
    this.user = bullyData.user;
    this.data = bullyData.data;

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
