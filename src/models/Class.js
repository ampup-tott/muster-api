'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, trim: true },
  status: { type: Boolean, default: true },
  teacher_id: { type: String, trim: true },
  subject_id: { type: String, trim: true },
  student_ids: { type: Array },
  create_at: { type: Number },
  update_at: { type: Number }
});

module.exports = mongoose.model('Class', schema, 'class');