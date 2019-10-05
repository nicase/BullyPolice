const { Schema } = require('mongoose');

const matchSchema = new Schema({
  league: {
    type: String,
    values: ['PL', 'PD'],
    required: true,
  },
  matchday: {
    type: String,
    required: true,
  },
  local: {
    type: String,
    required: true,
  },
  visitor: {
    type: String,
    required: true,
  },
  gLocDec: {
    type: String,
  },
  gVisDec: {
    type: String,
  },
  gLoc: {
    type: String,
  },
  gVis: {
    type: String,
  },
  percent: {
    type: String,
  }
}, {
  timestamps: true,
});

module.exports = ({ mongoose }) => mongoose.model('Match', matchSchema);
