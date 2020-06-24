'use strict';

import Story from '../../models/Story';

module.exports = async (req, res, next) => {
  const { class_id } = req.params;
  if (!class_id) {
    return next('Missing parameter: class_id');
  }

  const stories = await Story.find({ class_id });

  if (!stories) {
    return next('Wrong parameter: class_id');
  }

  const result = stories.reduce((obj, story) => {
    return {
      ...obj,
      [story.date]: [...(obj.date || []), story],
    };
  }, {});

  return res.json({
    status: 'OK',
    data: Object.keys(result),
  });
};
