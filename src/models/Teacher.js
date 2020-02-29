'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id: { type: String, trim: true },
  first_name: { type: String, trim: true },
  last_name: { type: String, trim: true },
  name: { type: String, trim: true },
  email: { type: String, trim: true },
  birthday: { type: Number },
  address: { type: String, trim: true },
  phone: { type: String, trim: true },
  major: { type: Array },
  hash: { type: String },
  salt: { type: String },
  is_super_admin: { type: Boolean, default: false }
});

module.exports = mongoose.model('Student', schema, 'student');