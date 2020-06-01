'use strict';

import Subject from '../../models/Subject';

module.exports = async (req, res, next) => {
  const data = Subject.find();

  res.json({
    status: 'OK',
    data,
  });
};
