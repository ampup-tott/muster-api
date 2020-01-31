'use strict';

module.exports = async (req, res, next) => {
  return res.json({
    UP_STAGE: process.env.UP_STAGE,
    STATUS: 'OK'
  })
}