'use strict';

import Student from '../models/Student';

module.exports = async (req, res, next) => {
  const { students } = req.body;
  try {
    if (!students) {
      return next('Missing parameter: students');
    }

    students.forEach(async (student) => {
      const {
        id,
        first_name,
        last_name,
        name,
        birthday,
        address,
        phone,
        major,
      } = student;

      if (
        !id ||
        !first_name ||
        !last_name ||
        !name ||
        !birthday ||
        !address ||
        !phone ||
        !major
      ) {
        return next('Wrong parameter!');
      }
      
      await Student.findOneAndUpdate(
        {
          id: student.id,
        },
        student,
        { new: true, upsert: true }
      );
    });

    return res.json({
      status: 'OK',
    });
  } catch (error) {
    return next(error);
  }
};
