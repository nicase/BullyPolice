const Status = require('http-status');

// const { checkUserAuthenticated } = require('../../middlewares');
// const { checkUserAuthenticated, userIsAdmin } = require('../../../middlewares');

module.exports = [
  // checkUserAuthenticated,
  // userIsAdmin,
  (req, res, next) => {
    const numDiscover = req.container.resolve('NumDiscover');
    const { SUCCESS, ERROR } = numDiscover.outputs;
    const filter = req.query || req.body;

    numDiscover
      .on(SUCCESS, (discovers) => {
        res.status(Status.OK).json(discovers);
      })
      .on(ERROR, (err) => {
        res.status(Status.OK).json({});
      });

    return numDiscover.execute(filter);
  },
];
