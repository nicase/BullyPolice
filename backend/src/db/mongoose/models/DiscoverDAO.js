const { Schema } = require('mongoose');

const discoverSchema = new Schema({
  nTweetsTotal: {
    type: Number,
    required: true
  },
  nTweetsAnalys: {
    type: Number,
    required: true
  },
  nPositive: {
    type: Number,
    required: true
  },
  nNeutral: {
    type: Number,
    required: true
  },
  nNegative: {
    type: Number,
    required: true
  },
  tweetsInterest: {
    type: Array,
    required: true
  }
}, {
  timestamps: true,
});

module.exports = ({ mongoose }) => mongoose.model('Discover', discoverSchema);
