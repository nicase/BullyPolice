const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;

const database = {};

database.mongoose = mongoose;

mongoose.set('useFindAndModify', false);
database.mongoose.set('useCreateIndex', true);


const modelsFolder = path.join(__dirname, 'models');
const indexFile = 'index.js';

fs
  .readdirSync(modelsFolder)
  .filter((file) => (file.indexOf('.') !== 0)
    && (file !== indexFile)
    && (file.slice(-3) === '.js'))
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const aux = require(path.join(modelsFolder, file));
    const model = aux({ mongoose: database.mongoose });
    database[model.modelName] = model;
  });


module.exports = database;
