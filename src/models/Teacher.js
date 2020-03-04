'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id: { type: Number, auto: true, unique: true },
  first_name: { type: String, trim: true },
  last_name: { type: String, trim: true },
  name: { type: String, trim: true },
  email: { type: String, trim: true, unique: true, index: true },
  birthday: { type: Number },
  address: { type: String, trim: true },
  phone: { type: String, trim: true },
  major: { type: Array },
  hash: { type: String, trim: true },
  salt: { type: String, trim: true },
  token: { type: String, trim: true },
  created_at: { type: Number },
  updated_at: { type: Number },
  last_login: { type: Number },
  is_super_user: { type: Boolean, default: false },
  status: { type: Boolean, default: true }
});

module.exports = mongoose.model('Teacher', schema, 'teacher');