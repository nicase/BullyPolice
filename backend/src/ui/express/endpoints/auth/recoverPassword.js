const Status = require('http-status');

module.exports = [
  (req, res, next) => {
    if (!req.body.email) {
      return res.status(Status.BAD_REQUEST).json({
        message: 'oldPassword is a required parameter',
      });
    }

    const recoverPassword = req.container.resolve('RecoverPassword');
    const {
      SUCCESS, ERROR, NOT_FOUND, DISABLED_ACCOUNT,
    } = recoverPassword.outputs;

    recoverPassword
      .on(SUCCESS, (info) => {
        res.status(Status.OK).json(info);
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          message: error.message,
        });
      })
      .on(DISABLED_ACCOUNT, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          message: error.message,
        });
      })
      .on(ERROR, next);

    return recoverPassword.execute(req.body.email);
  },
];
