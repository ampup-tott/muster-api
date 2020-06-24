'use strict';

import Story from '../../models/Story';

module.exports = async (req, res, next) => {
  const { class_id } = req.params;
  const { date } = req.body;

  if (!class_id) {
    return next('Missing parameter: class_id');
  }

  if (!date) {
    return next('Missing parameter: date');
  }

  const stories = await Story.find({ class_id, date });

  if (!stories) {
    return next('Wrong parameter: class_id');
  }

  return res.json({
    status: 'OK',
    data: stories,
  });
};
