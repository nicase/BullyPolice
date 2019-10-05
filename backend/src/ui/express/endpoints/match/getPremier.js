const Status = require('http-status');

const { checkUserAuthenticated } = require('../../middlewares');
// const { checkUserAuthenticated, userIsAdmin } = require('../../../middlewares');

module.exports = [
  checkUserAuthenticated,
  // userIsAdmin,
  (req, res, next) => {
    const getAllMatchs = req.container.resolve('GetAllMatchs');
    const { SUCCESS, ERROR } = getAllMatchs.outputs;
    const filter = { league: 'PL' };

    getAllMatchs
      .on(SUCCESS, (matchs) => {
        res.status(Status.OK).json(matchs);
      })
      .on(ERROR, (err) => {
        next(err);
      });

    return getAllMatchs.execute(filter);
  },
];
