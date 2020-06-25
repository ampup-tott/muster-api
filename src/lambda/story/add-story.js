'use strict';

import Story from '../../models/Story';

module.exports = async (req, res, next) => {
  const { class_id, students, date, notes } = req.body;

  if (!class_id) {
    return next('Missing parameter: class_id');
  }

  if (!students) {
    return next('Missing parameter: students');
  }

  if (!date) {
    return next('Missing paramter: date');
  }

  if (!notes) {
    return next('Missing paramter: notes');
  }

  let result = [];
  for (let student in students) {
    result.push({
      class_id,
      date,
      student_id: student,
      attend: students[student],
      note: notes[student]
    });
  }

  let total = 0;
  result = result.map((student) => {
    return Story.findOneAndUpdate(
      {
        class_id: student.class_id,
        date: student.date,
        student_id: student.student_id,
      },
      student,
      {
        new: true,
        upsert: true,
      },
      () => ++total
    );
  });

  Promise.all(result)
    .then(() => {
      console.log(`Inserted ${total} students in class ${class_id}`);
    })
    .catch(error => {
      console.log(error);
    })

  return res.json({
    status: 'OK',
  });
};
