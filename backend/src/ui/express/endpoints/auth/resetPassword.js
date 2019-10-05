const Status = require('http-status');

module.exports = [
  (req, res, next) => {
    if (!req.body.token) {
      return res.status(Status.BAD_REQUEST).json({
        message: 'token is a required parameter',
      });
    }

    if (!req.body.password) {
      return res.status(Status.BAD_REQUEST).json({
        message: 'password is a required parameter',
      });
    }

    const resetPassword = req.container.resolve('ResetPassword');
    const {
      SUCCESS, ERROR, BAD_TOKEN, VALIDATION_ERROR,
    } = resetPassword.outputs;

    resetPassword
      .on(SUCCESS, (user) => {
        res.status(Status.OK).json(user);
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          message: error.message,
        });
      })
      .on(BAD_TOKEN, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'BadTokenError',
          message: error.message,
        });
      })
      .on(ERROR, next);

    return resetPassword.execute(req.body.token, req.body.password);
  },
];
