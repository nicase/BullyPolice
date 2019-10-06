const Status = require('http-status');

// const { checkUserAuthenticated, userIsAdmin } = require('../../../middlewares');

module.exports = [
  // checkUserAuthenticated,
  // userIsAdmin,
  (req, res, next) => {
    const recieveDiscover = req.container.resolve('RecieveDiscover');
    const {
      SUCCESS, ERROR, VALIDATION_ERROR, CONFLICT,
    } = recieveDiscover.outputs;

    recieveDiscover
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

    return recieveDiscover.execute(req.body);
  },
];
