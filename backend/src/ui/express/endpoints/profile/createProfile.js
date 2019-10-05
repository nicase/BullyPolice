const Status = require('http-status');

// const { checkUserAuthenticated, userIsAdmin } = require('../../../middlewares');

module.exports = [
  // checkUserAuthenticated,
  // userIsAdmin,
  (req, res, next) => {
    const createProfile = req.container.resolve('CreateProfile');
    const {
      SUCCESS, ERROR, VALIDATION_ERROR, CONFLICT,
    } = createProfile.outputs;

    createProfile
      .on(SUCCESS, (profile) => {
        res.status(Status.OK).json(profile);
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          message: error.message,
        });
      })
      .on(CONFLICT, (error) => {
        res.status(Status.CONFLICT).json({
          type: 'ConflictError',
          message: error.message,
        });
      })
      .on(ERROR, (err) => {
        next(err);
      });

    return createProfile.execute(req.body);
  },
];
