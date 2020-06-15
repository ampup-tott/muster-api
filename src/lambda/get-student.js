'use strict';

import Student from '../models/Student';

module.exports = async (req, res, next) => {
    const { id } = req.params;
    const student = await Student.findOne({ _id: id });

    if (!student) {
        return next('Student is not exist');
    }

    return res.json({
        status: 'OK',
        data: {
            id: student.id,
            first_name: student.first_name,
            last_name: student.last_name,
            name: student.name,
            birthday: student.birthday,
            address: student.address,
            phone: student.phone,
            major: student.major,
        }
    });
};