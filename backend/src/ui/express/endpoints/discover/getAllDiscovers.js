const Status = require('http-status');

// const { checkUserAuthenticated } = require('../../middlewares');
// const { checkUserAuthenticated, userIsAdmin } = require('../../../middlewares');

module.exports = [
  // checkUserAuthenticated,
  // userIsAdmin,
  (req, res, next) => {
    const getAllDiscovers = req.container.resolve('GetAllDiscovers');
    const { SUCCESS, ERROR } = getAllDiscovers.outputs;
    const filter = req.query || req.body;

    getAllDiscovers
      .on(SUCCESS, (discovers) => {
        res.status(Status.OK).json(discovers);
      })
      .on(ERROR, (err) => {
        res.status(Status.OK).json({});
      });

    return getAllDiscovers.execute(filter);
  },
];
