"use strict";

import moment from "moment";
import Class from "../../models/Class";
module.exports = async (req, res, next) => {
  const { name, teacher_id, subject_id, student_ids } = req.body;

  if (!name) {
    return next("Missing parameter: name");
  }

  if (!subject_id) {
    return next("Missing parameter: subject_id");
  }

  if (!teacher_id) {
    return next("Missing parameter: teacher_id");
  }

  if (!student_ids && (student_ids || !student_ids.length)) {
    return next("Missing or wrong parameter: student_ids");
  }

  try {
    await Class.insertMany([
      {
        name,
        teacher_id,
        subject_id,
        student_ids,
        create_at: moment().unix(),
        update_at: moment().unix(),
      },
    ]);
  } catch (error) {
    return next(error);
  }

  return res.json({
    status: 'OK',
  });
};
