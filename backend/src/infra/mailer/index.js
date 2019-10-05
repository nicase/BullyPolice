const fs = require('fs');
const path = require('path');
const mailer = require('emailjs');
const handlebars = require('handlebars');

const recoverPasswordTemplate = handlebars.compile(fs.readFileSync(
  path.join(__dirname, '/templates/recoverPassword.hbs'),
  'utf8',
));

class Mailer {
  constructor({ config }) {
    this.config = config;

    this.server = mailer.server.connect({
      user: this.config.mailer.user,
      password: this.config.mailer.password,
      host: this.config.mailer.host,
      port: this.config.mailer.port,
      ssl: this.config.mailer.secure,
    });
  }

  async sendRecoverPasswordEmail(to, locals) {
    try {
      const params = Object.assign(locals, {
        url: 'www.google.com', // TODO: definir url adminpanel --> this.config.adminPanel.url 
        action: '/reset-password/',
      });
      const message = {
        from: this.config.mailer.from,
        to,
        text: '',
        subject: 'Recover password email',
        attachment: [{ data: recoverPasswordTemplate(params), alternative: true }],
      };
      return await this.server.send(message);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Mailer;
