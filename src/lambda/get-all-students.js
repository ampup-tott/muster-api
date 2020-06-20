'use strict';

import Subject from '../models/Student';

module.exports = async (req, res, next) => {
  const users = await Subject.find().select([
    'first_name',
    'last_name',
    'name',
    'birthday',
    'address',
    'phone',
    'major',
  ]);

  res.json({
    status: 'OK',
    data: users,
  });
};
