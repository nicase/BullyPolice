const Status = require('http-status');

// const { checkUserAuthenticated, userIsAdmin } = require('../../../middlewares');

module.exports = [
  // checkUserAuthenticated,
  // userIsAdmin,
  (req, res, next) => {
    const createMatch = req.container.resolve('CreateMatch');
    const {
      SUCCESS, ERROR, VALIDATION_ERROR, CONFLICT,
    } = createMatch.outputs;

    createMatch
      .on(SUCCESS, (match) => {
        res.status(Status.OK).json(match);
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

    return createMatch.execute(req.body);
  },
];
