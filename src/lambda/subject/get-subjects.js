'use strict';

import Subject from '../../models/Subject';
import Class from '../../models/Class';

module.exports = async (req, res, next) => {
  const { id } = req.user_token;
  const teacher_classes = await Class.find({
    teacher_id: id,
    status: true,
  });

  if (!teacher_classes) {
    return next('Something went wrong!');
  }

  const subject_ids = teacher_classes.map((c) => c.subject_id);

  if (!subject_ids) {
    return next('Something went wrong!');
  }

  const subjects = await Subject.find({
    _id: {
      $in: subject_ids,
    },
  });

  res.json({
    status: 'OK',
    data: subjects,
  });
};
