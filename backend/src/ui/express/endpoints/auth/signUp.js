const Status = require('http-status');

module.exports = [
  (req, res, next) => {
    const signUp = req.container.resolve('SignUp');
    const {
      SUCCESS, ERROR, VALIDATION_ERROR, ALREADY_REGISTERED,
    } = signUp.outputs;

    signUp
      .on(SUCCESS, (user) => {
        res.status(Status.OK).json(user);
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          message: error.message,
        });
      })
      .on(ALREADY_REGISTERED, (error) => {
        res.status(Status.CONFLICT).json({
          type: 'EmailAlreadyExistError',
          message: error.message,
        });
      })
      .on(ERROR, (err) => {
        next(err);
      });

    return signUp.execute(req.body);
  },
];
