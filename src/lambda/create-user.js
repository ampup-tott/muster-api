'use strict';

import crypto from 'crypto';
import moment from 'moment';

import Teacher from '../models/Teacher';

module.exports = async (req, res, next) => {
  const {
    first_name,
    last_name,
    name,
    email,
    birthday,
    address,
    phone,
    major,
    password
  } = req.body;

  if (!first_name) {
    return next('Missing parameter: first_name');
  }

  if (!last_name) {
    return next('Missing parameter: last_name');
  }

  if (!name) {
    return next('Missing parameter: name');
  }

  if (!email) {
    return next('Missing parameter: email');
  }

  if (!birthday) {
    return next('Missing parameter: birthday');
  }

  if (!address) {
    return next('Missing parameter: address');
  }

  if (!phone) {
    return next('Missing parameter: phone');
  }

  if (!major) {
    return next('Missing parameter: major');
  }

  if (!password) {
    return next('Missing parameter: password');
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');

  await Teacher.insertMany([{
    first_name,
    last_name,
    name,
    email,
    birthday,
    address,
    phone,
    major,
    salt,
    hash,
    created_at: moment.unix()
  }])

  return res.json({
    status: 'OK'
  })
}