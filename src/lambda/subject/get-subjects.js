'use strict';

import Subject from '../../models/Subject';

module.exports = async (req, res, next) => {
  const data = await Subject.find();

  res.json({
    status: 'OK',
    data,
  });
};
