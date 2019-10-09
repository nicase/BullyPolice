
class User {
  constructor(userData) {
    if (!(userData.email && userData.firstName && userData.lastName
      && userData.role)) {
      throw new Error('ValidationError');
    }

    if (!(userData.role === 'admin' || userData.role === 'basic')) {
      throw new Error('ValidationError');
    }

    if (!User.validateEmail(userData.email)) {
      throw new Error('BadEmailError');
    }

    this.email = userData.email;
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.role = userData.role;
    this.discover = userData.discover || 0;
    this.isMatched = userData.isMatched || false;

    if (userData.id) {
      this.id = userData.id;
    }

    if (userData.createdAt) {
      this.createdAt = userData.createdAt;
    }
    if (userData.updatedAt) {
      this.updatedAt = userData.updatedAt;
    }
  }

  static validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  isAdmin() {
    return this.role === 'admin';
  }
}

module.exports = User;
