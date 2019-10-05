const Status = require('http-status');
const passport = require('passport');

module.exports = [
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    const generateAuthToken = req.container.resolve('GenerateAuthToken');
    const { SUCCESS, ERROR } = generateAuthToken.outputs;

    if (!req.user) {
      return res.status(Status.UNAUTHORIZED).json({
        type: 'UnauthorizedError',
      });
    }

    generateAuthToken
      .on(SUCCESS, (token) => {
        res.status(Status.OK).json({ token, user: req.user });
      })
      .on(ERROR, next);

    return generateAuthToken.execute(req.user.id);
  },
];
