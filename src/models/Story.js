'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  student_id: { type: String, trim: true },
  class_id: { type: String, trim: true },
  date: { type: String, trim: true },
  attend: { type: Boolean },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model('Story', schema, 'story');
