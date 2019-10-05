const Status = require('http-status');

// const { checkUserAuthenticated } = require('../../middlewares');
// const { checkUserAuthenticated, userIsAdmin } = require('../../../middlewares');

module.exports = [
  // checkUserAuthenticated,
  // userIsAdmin,
  (req, res, next) => {
    const getAllProfiles = req.container.resolve('GetAllProfiles');
    const { SUCCESS, ERROR } = getAllProfiles.outputs;
    const filter = req.query;

    getAllProfiles
      .on(SUCCESS, (profiles) => {
        res.status(Status.OK).json(profiles);
      })
      .on(ERROR, (err) => {
        next(err);
      });

    return getAllProfiles.execute(filter);
  },
];
