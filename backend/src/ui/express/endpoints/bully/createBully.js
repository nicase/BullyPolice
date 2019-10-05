const Status = require('http-status');

// const { checkUserAuthenticated, userIsAdmin } = require('../../../middlewares');

module.exports = [
  // checkUserAuthenticated,
  // userIsAdmin,
  (req, res, next) => {
    const createBully = req.container.resolve('CreateBully');
    const {
      SUCCESS, ERROR, VALIDATION_ERROR, CONFLICT,
    } = createBully.outputs;

    createBully
      .on(SUCCESS, (bully) => {
        res.status(Status.OK).json(bully);
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

    return createBully.execute(req.body);
  },
];
