const bcrypt = require('bcrypt');

const User = require('./User');

class Auth {
  constructor(authData) {
    if (!(authData.email && authData.password)) {
      throw new Error('ValidationError');
    }

    if (!Auth.validateEmail(authData.email)) {
      throw new Error('BadEmailError');
    }

    this.email = authData.email;
    this.password = authData.password;
    this.enabled = authData.enabled || true;
    this.signInCount = authData.signInCount;
    this.token = authData.token;

    if (authData.id) {
      this.id = authData.id;
    }
    if (authData.user) {
      if (authData.user.email) {
        this.user = new User(authData.user);
      } else {
        this.user = authData.user;
      }
    }

    if (authData.createdAt) {
      this.createdAt = authData.createdAt;
    }
    if (authData.updatedAt) {
      this.updatedAt = authData.updatedAt;
    }
  }

  static validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  checkAndSetPassword(password) {
    const pswRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;

    if (!password) {
      if (this.password.length < 8) {
        throw new Error('BadPasswordError');
      }
      this.password = bcrypt.hashSync(this.password, 10);
    } else {
      if (password.length < 8) {
        throw new Error('BadPasswordError');
      }
      this.password = bcrypt.hashSync(password, 10);
    }
  }

  checkEnabled() {
    if (!this.enabled) {
      throw new Error('DisabledAccountError');
    }
  }
  
  validatePassword(password) {
    if (!bcrypt.compareSync(password, this.password)) {
      throw new Error('InvalidPasswordError');
    }
  }

  generateToken() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 30; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.token = text;
  }
}

module.exports = Auth;
