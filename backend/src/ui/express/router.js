const Status = require('http-status');
const { Router } = require('express');

const signUp = require('./endpoints/auth/signUp');
const login = require('./endpoints/auth/login');
const adminLogin = require('./endpoints/auth/adminLogin');
const resetPassword = require('./endpoints/auth/resetPassword');
const recoverPassword = require('./endpoints/auth/recoverPassword');

const premier = require('./endpoints/match/getPremier');
const liga = require('./endpoints/match/getLiga');
const createMatch = require('./endpoints/match/createMatch');

const createBully = require('./endpoints/bully/createBully');
const getBullys = require('./endpoints/bully/getBully');

const createProfile = require('./endpoints/profile/createProfile');
const getProfiles = require('./endpoints/profile/getProfile');

const startDiscover = require('./endpoints/discover/startDiscover');
const recieveDiscover = require('./endpoints/discover/recieveDiscover');
const getAllDiscovers = require('./endpoints/discover/getAllDiscovers');

const router = Router();

router.post('/auth/signup', signUp);
router.post('/auth/login', login);
router.post('/auth/login-admin', adminLogin);
router.post('/auth/reset-password', resetPassword);
router.post('/auth/recover-password', recoverPassword);

router.get('/match/premier', premier);
router.get('/match/liga', liga);
router.post('/match', createMatch);

router.post('/bully', createBully);
router.get('/bully', getBullys);

router.post('/profile', createProfile);
router.get('/profile', getProfiles);

router.post('/startDiscover', startDiscover);
router.post('/discover', recieveDiscover);
router.get('/discover', getAllDiscovers);


router.get('/status', (req, res) => res.status(Status.OK).json({ status: 'OK' }));

module.exports = router;
