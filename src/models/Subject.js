'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id: { type: String, trim: true },
  name: { type: String, trim: true },
  status: { type: Boolean, default: true },
  created_at: { type: Number },
  updated_at: { type: Number }
});

module.exports = mongoose.model('Subject', schema, 'subject');