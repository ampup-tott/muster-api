'use strict';

import Student from '../models/Student';

module.exports = async (req, res, next) => {
  const { students } = req.body;
  const {
    id,
    first_name,
    last_name,
    name,
    birthday,
    address,
    phone,
    major,
  } = students[0];

  if (
    !id ||
    !first_name ||
    !last_name ||
    !name ||
    !birthday ||
    !address ||
    !phone ||
    !major
  ) {
    return next('Wrong parameter!');
  }

  return res.json({
    status: 'OK',
  });
};
