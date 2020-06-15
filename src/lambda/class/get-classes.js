'use strict';

import Class from '../../models/Class';

module.exports = async (req, res, next) => {
  const { id } = req.user_token;
  const { subject_id } = req.params;

  if (isNaN(subject_id)) {
    return next('Missing or wrong parameter: subject_id');
  }

  const classes = await Class.find({
    teacher_id: id,
    subject_id,
  });

  return res.json({
    status: 'OK',
    data: classes,
  });
};
