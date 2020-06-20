'use strict';

import Subject from '../../models/Subject';

module.exports = async (req, res, next) => {
  const subjects = await Subject.find()
    .select(['id', 'name', 'mask', 'created_at']);

  res.json({
    status: 'OK',
    data: subjects,
  });
};
