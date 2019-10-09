const Status = require('http-status');
const { Router } = require('express');

const signUp = require('./endpoints/auth/signUp');
const login = require('./endpoints/auth/login');

const createBully = require('./endpoints/bully/createBully');
const getBullys = require('./endpoints/bully/getBully');

const createProfile = require('./endpoints/profile/createProfile');
const getProfiles = require('./endpoints/profile/getProfile');

const startDiscover = require('./endpoints/discover/startDiscover');
const recieveDiscover = require('./endpoints/discover/recieveDiscover');
const getAllDiscovers = require('./endpoints/discover/getAllDiscovers');
const numDiscover = require('./endpoints/discover/numDiscover');
const addDiscover = require('./endpoints/discover/addDiscover');

const router = Router();

router.post('/auth/signup', signUp);
router.post('/auth/login', login);

router.post('/bully', createBully);
router.get('/bully', getBullys);

router.post('/profile', createProfile);
router.get('/profile', getProfiles);

router.post('/startDiscover', startDiscover);
router.post('/discover', recieveDiscover);
router.get('/discover', getAllDiscovers);
router.get('/nDiscover', numDiscover);
router.get('/addDiscover', addDiscover);



router.get('/status', (req, res) => res.status(Status.OK).json({ status: 'OK' }));

module.exports = router;
