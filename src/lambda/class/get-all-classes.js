'use strict';

import Class from '../../models/Class';
import Subject from '../../models/Subject';
import Teacher from '../../models/Teacher';

module.exports = async (req, res, next) => {
  let classes = await Class.find().select([
    'name',
    'teacher_id',
    'subject_id',
    'student_ids',
  ]);

  let subjects = await Subject.find().select(['name', 'mask']);
  let teachers = await Teacher.find().select(['name']);

  classes = classes.map((cls) => {
    const subject= subjects.find(
      (subject) => subject._id == cls.subject_id
    );
    const teacher = teachers.find((teacher) => teacher._id == cls.teacher_id);
    return {
      name: cls.name,
      student_ids: cls.student_ids,
      subject_name: subject.name,
      mask: subject.mask,
      teacher_name: teacher.name,
    };
  });

  return res.json({
    status: 'OK',
    data: classes,
  });
};
