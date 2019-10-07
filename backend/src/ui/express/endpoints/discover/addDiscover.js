const Status = require('http-status');

// const { checkUserAuthenticated } = require('../../middlewares');
// const { checkUserAuthenticated, userIsAdmin } = require('../../../middlewares');

module.exports = [
  // checkUserAuthenticated,
  // userIsAdmin,
  (req, res, next) => {
    const addDiscover = req.container.resolve('AddDiscover');
    const { SUCCESS, ERROR } = addDiscover.outputs;

    addDiscover
      .on(SUCCESS, (discovers) => {
        res.status(Status.OK).json(discovers);
      })
      .on(ERROR, (err) => {
        res.status(Status.OK).json({});
      });

    return addDiscover.execute();
  },
];
