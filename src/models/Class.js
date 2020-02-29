'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id: { type: String, trim: true },
  name: { type: String, trim: true },
  status: { type: Boolean, default: true },
  adcademy_year: { type: String, trim: true },
  term: { type: String, trim: true },
  teacher_id: { type: String, trim: true },
  subject_id: { type: String, trim: true },
  student_ids: { type: Array },
  create_at: { type: Number },
  update_at: { type: Number }
});

module.exports = mongoose.model('Class', schema, 'class');