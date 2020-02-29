'use strict';

import Teacher from '../models/Teacher';
import bcrypt from 'bcrypt';

module.exports = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return next('Missing parameter: username');
  }

  if (!password) {
    return next('Missing parameter: password');
  }

  let teacher = await Teacher.find({ email: username });

  if (!teacher) {
    return next('User not found');
  }

  let isValid = bcrypt.compareSync(password, teacher.hash);
  if (!isValid) {
    return next('Wrong username or password');
  }

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
      token: teacher.token,
      last_login: teacher.last_login
    }
  })
}