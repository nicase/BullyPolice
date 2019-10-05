const { Schema } = require('mongoose');

const authSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    unique: true,
    required: true,
    sparse: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  signInCount: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = ({ mongoose }) => mongoose.model('Auth', authSchema);
