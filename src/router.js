'use strict';

const app = require('router')();
const body = require('body-parser');
const passport = require('./passport');
require('../mongoosefile');

app.use(body.json({ limit: '50mb' }));
app.use(require('./mid/query'));
app.use(require('./mid/json'));

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

module.exports = app;
