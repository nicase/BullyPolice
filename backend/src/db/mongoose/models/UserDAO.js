const { Schema } = require('mongoose');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  discover: {
    type: Number,
    requires: true,
    default: 0,
  },
  role: {
    type: String,
    values: ['basic', 'admin'],
    default: 'basic',
  },
  isMatched: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = ({ mongoose }) => mongoose.model('User', userSchema);
