const container = require('../../container');

const config = container.resolve('config');
const mongoose = container.resolve('mongoose');
const Profile = container.resolve('profileDAO');
const Bully = container.resolve('bullyDAO');

const profiles = require('../../db/mongoose/fixtures/profiles');
const bullies = require('../../db/mongoose/fixtures/bullies');


mongoose.connect(config.database.url, { useNewUrlParser: true }).then(async () => {
  try {
    for (let i = 0; i < profiles.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await Profile.create(profiles[i]);
    }
    for (let i = 0; i < bullies.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await Bully.create(bullies[i]);
    }
  } catch (error) {
    console.error(error);
  }
  mongoose.connection.close();
});
