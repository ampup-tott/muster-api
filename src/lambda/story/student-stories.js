'use strict';

import Story from '../../models/Story';
import Student from '../../models/Student';
import Class from '../../models/Class';

module.exports = async (req, res, next) => {
  const { class_id, student_id } = req.params;

  if (!class_id) {
    return next('Missing parameter: class_id');
  }

  if (!student_id) {
    return next('Missing parameter: student_id');
  }

  const student = await Student.findById(student_id);
  if (!student) {
    return next('Wrong parameter: student_id');
  }

  const stories = await Story.find({ class_id, student_id });
  const cls = await Class.findById(class_id);

  if (!stories) {
    return next('Wrong parameter: class_id');
  }

  let attend = 0, absent = 0;
  stories.forEach(story => {
    if (story.attend) {
      ++attend;
    } else {
      ++absent
    }
  });

  return res.json({
    status: 'OK',
    data: {
      class_name: cls.name,
      profile: student,
      stories: stories,
      summary: {
        attend,
        absent,
        ratio_attend: `${attend / (attend + absent) * 100}%`
      }
    },
  });
};
