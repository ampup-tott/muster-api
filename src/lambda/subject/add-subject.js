'use strict';

import Subject from '../../models/Subject';
import moment from 'moment';

module.exports = async (req, res, next) => {
  try {
    const { id, name } = req.body;

    if (!id) {
      return next('Missing parameter: id');
    }

    if (!name) {
      return next('Missing parameter: name');
    }
    
    const subject = await Subject.findOne({ id });
    if (subject) {
      return next('Subject is existed');
    }

    const utc_now = moment().unix();
    await Subject.insertMany([{
      id,
      name,
      created_at: utc_now,
      updated_at: utc_now
    }]);

    return res.json({
      status: 'OK'
    });

  } catch(error) {
    return next(error.message);
  };
};