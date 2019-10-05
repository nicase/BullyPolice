const Status = require('http-status');

// const { checkUserAuthenticated } = require('../../middlewares');
// const { checkUserAuthenticated, userIsAdmin } = require('../../../middlewares');

module.exports = [
  // checkUserAuthenticated,
  // userIsAdmin,
  (req, res, next) => {
    const getAllBullys = req.container.resolve('GetAllBullys');
    const { SUCCESS, ERROR } = getAllBullys.outputs;
    const filter = req.query || req.body;

    getAllBullys
      .on(SUCCESS, (bullys) => {
        res.status(Status.OK).json(bullys);
      })
      .on(ERROR, (err) => {
        next(err);
      });

    return getAllBullys.execute(filter);
  },
];
