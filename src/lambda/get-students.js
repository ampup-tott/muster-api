'use strict';

import Class from '../models/Class';
import Student from '../models/Student';

module.exports = async (req, res, next) => {
  const { class_id } = req.params;

  if (!class_id) {
    return next('Missing parameter: class_id');
  }

  console.log(class_id);

  const cls = await Class.findById(class_id).select(['student_ids']);

  if (!cls) {
    return next('Wrong class_id');
  }

  const { student_ids } = cls;

  const students = await Student.find({
    _id: { $in: student_ids },
  });

  return res.json({
    status: 'OK',
    data: students,
  });
};
