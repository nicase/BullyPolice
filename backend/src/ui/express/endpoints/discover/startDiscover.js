const Status = require('http-status');

const { checkUserAuthenticated } = require('../../middlewares');

module.exports = [
  checkUserAuthenticated,
  // userIsAdmin,
  (req, res, next) => {
    const startDiscover = req.container.resolve('StartDiscover');
    const {
      SUCCESS, ERROR, VALIDATION_ERROR, CONFLICT,
    } = startDiscover.outputs;

    startDiscover
      .on(SUCCESS, (discover) => {
        res.status(Status.OK).json(discover);
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

    return startDiscover.execute(req.body);
  },
];
