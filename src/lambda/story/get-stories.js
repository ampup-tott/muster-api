'use strict';

import Story from '../../models/Story';
import Student from '../../models/Student';

module.exports = async (req, res, next) => {
  const { class_id } = req.params;
  const { date } = req.body;

  if (!class_id) {
    return next('Missing parameter: class_id');
  }

  if (!date) {
    return next('Missing parameter: date');
  }

  let stories = await Story.find({ class_id, date }).select([
    'student_id',
    'class_id',
    'date',
  ]);

  if (!stories.length) {
    return next('Wrong parameter: class_id');
  }

  let student_ids = stories.map((story) => story.student_id);

  const students = await Student.find({
    _id: {
      $in: student_ids,
    },
  }).select(['name', 'id', 'phone', 'address', 'email']);

  if (!students.length) {
    return next('Something went wrong for class student');
  }

  stories = stories.map((story) => {
    const student = students.find((student) => student._id == story.student_id);
    return {
      student_id: story.student_id,
      class_id: story.class_id,
      date: story.date,
      name: student.name,
      id: student.id,
      phone: student.phone,
      address: student.address,
      email: student.email,
    };
  });

  return res.json({
    status: 'OK',
    data: stories,
  });
};
