const { Schema } = require('mongoose');

const profileSchema = new Schema({
  platform: {
    type: String,
    values: ['tw', 'rd'],
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = ({ mongoose }) => mongoose.model('Profile', profileSchema);
