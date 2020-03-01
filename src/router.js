'use strict';

const app = require('router')();
const body = require('body-parser');
const passport = require('./passport');
const cors = require('cors');

require('../mongoosefile');

app.use(body.json({ limit: '50mb' }));
app.use(require('./mid/query'));
app.use(require('./mid/json'));
app.use(cors());

const ensureLogged = passport.authenticate('jwt', { session: false });

const ensureAdmin = async (req, res, next) => {
  if (!req.user_token) {
    return next(new Error('Forbidden 1'));
  }
  if (!req.user_token.is_super_user) {
    return next(new Error('Forbidden 2'));
  }

  next();
};

app.get('/', require('./lambda/status'));

app.post('/create-user', ensureAdmin, ensureLogged, require('./lambda/create-user'));

app.post('/login', require('./lambda/login'));
app.post('/import-students', ensureLogged, require('./lambda/import-students'));
app.get('/get-class', ensureLogged, require('./lambda/get-class'));
app.get('/get-classes', ensureLogged, require('./lambda/get-classes'));

app.use(async (err, req, res, next) => {
  let error_code = err && err.message == 'Token is invalid' ? 4001 : undefined;

  if (!res.statusCode || res.statusCode === 200) {
    res.statusCode = 400;
  }
  if (error_code == 4001) {
    res.statusCode = 401;
  }

  let data = {
    status: 'FAIL',
    reason: err.message ? err.message : err.toString(),
    error_code
  };
  res.json(data);
});

module.exports = app;
