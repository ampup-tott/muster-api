'use strict';

import Teacher from '../models/Teacher';
import moment from 'moment';

module.exports = async (req, res, next) => {

  const email = req.user_token.email;

  const user = await Teacher.findOne({ email });

  if (!user) {
    return next('User is not exist');
  }

  return res.json({
    status: 'OK',
    data: {
      email: user.email,
      name: user.name,
      birthday: user.birthday,
      address: user.address,
      phone: user.phone,
      role: user.is_superuser ? 'admin' : 'user'
    }
  });
};