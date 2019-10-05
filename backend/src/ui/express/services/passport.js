const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const initLocalStrategy = () => {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (request, email, password, done) => {
      const checkAuthCredentials = request.container.resolve('CheckAuthCredentials');

      const {
        SUCCESS, ERROR, BAD_EMAIL, BAD_PASSWORD,
      } = checkAuthCredentials.outputs;

      checkAuthCredentials
        .on(SUCCESS, (user) => done(null, user))
        .on(BAD_EMAIL, () => done(null, false, { message: 'Incorrect email' }))
        .on(BAD_PASSWORD, () => done(null, false, { message: 'Incorrect password' }))
        .on(ERROR, (error) => done(error));

      checkAuthCredentials.execute(email, password);
    },
  ));
};

const initBearerStrategy = () => {
  passport.use(new BearerStrategy(
    { passReqToCallback: true },
    (request, token, done) => {
      const checkAuthToken = request.container.resolve('CheckAuthToken');
      const {
        SUCCESS, INVALID_TOKEN,
      } = checkAuthToken.outputs;

      checkAuthToken
        .on(SUCCESS, (user) => done(null, user, { scope: 'read' }))
        .on(INVALID_TOKEN, () => done(null, false));
      checkAuthToken.execute(token);
    },
  ));
};

const initPassport = () => {
  initLocalStrategy();
  initBearerStrategy();
};


module.exports = {
  initPassport,
};
