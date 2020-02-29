'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  academic_year: { type: String, trim: true },
  term: { type: String, trim: true },
  student_id: { type: String, trim: true },
  class_id: { type: String, trim: true },
  absent: { type: Number },
  timeline: [
    {
      time: { type: Number },
      comment: { type: String, trim: true }
    }
  ],
  status: { type: Boolean, default: true }
});

module.exports = mongoose.model('Story', schema, 'story');