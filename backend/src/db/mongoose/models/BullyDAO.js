const { Schema } = require('mongoose');

const bullySchema = new Schema({
  platform: {
    type: String,
    values: ['tw', 'rd'],
    required: true
  },
  language: {
    type: String,
    values: ['en', 'es'],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  data: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  link: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

module.exports = ({ mongoose }) => mongoose.model('Bully', bullySchema);
