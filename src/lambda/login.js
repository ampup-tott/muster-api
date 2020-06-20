'use strict';

import moment from 'moment'; 
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import Teacher from '../models/Teacher';

module.exports = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return next('Missing parameter: username');
  }

  if (!password) {
    return next('Missing parameter: password');
  }

  let teacher = await Teacher.findOne({ email: username });

  if (!teacher) {
    return next('User not found');
  }

  const salt = teacher.salt;
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  const isValid = hash === teacher.hash;
  
  if (!isValid) {
    return next('Wrong username or password');
  }

  let token = jwt.sign(
    {
      email: teacher.email,
      id: teacher._id,
      is_super_user: teacher.is_super_user
    },
    process.env.SECRET
  );

  let utc_now = moment().unix();

  await Teacher.updateOne(
    { email: username },
    {
      _id: teacher._id,
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      name: teacher.name,
      email: teacher.email,
      birthday: teacher.birthday,
      address: teacher.address,
      phone: teacher.phone,
      major: teacher.major,
      token,
      hash: teacher.hash,
      salt: teacher.salt,
      created_at: teacher.created_at,
      updated_at: utc_now,
      last_login: teacher.last_login || utc_now,
      is_super_user: teacher.is_super_user
    }
  );

  return res.json({
    status: 'OK',
    data: {
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      name: teacher.name,
      email: teacher.email,
      birthday: teacher.birthday,
      address: teacher.address,
      phone: teacher.phone,
      major: teacher.major,
      token: token,
      last_login: teacher.last_login || utc_now
    }
  })
}