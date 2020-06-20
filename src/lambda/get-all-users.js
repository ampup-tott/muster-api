'use strict';

import Subject from '../models/Teacher';

module.exports = async (req, res, next) => {
  const users = await Subject.find().select([
    'first_name',
    'last_name',
    'name',
    'email',
    'birthday',
    'address',
    'phone',
    'major',
    'created_at',
    'is_super_user',
  ]);

  res.json({
    status: 'OK',
    data: users,
  });
};
