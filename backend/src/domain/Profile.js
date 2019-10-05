
class Profile {
  constructor(profileData) {
    console.log(profileData)
    if (!(
      (profileData.platform == 'tw' 
      || profileData.platform == 'rd')
      && profileData.name
      && profileData.link)) {
      throw new Error('ValidationError');
    }
    this.platform = profileData.platform;
    this.name = profileData.name;
    this.link = profileData.link;

    if (profileData.id) {
      this.id = profileData.id;
    }

    if (profileData.createdAt) {
      this.createdAt = profileData.createdAt;
    }
    if (profileData.updatedAt) {
      this.updatedAt = profileData.updatedAt;
    }
  }

  isAdmin() {
    return this.role === 'admin';
  }
}

module.exports = Profile;
