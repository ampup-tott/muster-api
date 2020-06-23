'use strict';

const app = require('router')();
const body = require('body-parser');
const passport = require('./passport');
const cors = require('cors');

require('../mongoosefile');

app.use(body.json({ limit: '50mb' }));
app.use(require('./mid/query'));
app.use(require('./mid/json'));
app.use(passport.initialize());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const ensureLogged = passport.authenticate('jwt', { session: false });

const ensureAdmin = async (req, res, next) => {
  if (!req.user_token) {
    return next(new Error('wrong token'));
  }
  if (!req.user_token.is_super_user) {
    return next(new Error('Require Admin'));
  }
  next();
};

app.get('/', require('./lambda/status'));

app.post(
  '/create-user',
  ensureLogged,
  ensureAdmin,
  require('./lambda/create-user')
);

app.post('/login', require('./lambda/login'));
app.post('/import-students', ensureLogged, require('./lambda/import-students'));
app.get('/get-class', ensureLogged, require('./lambda/get-class'));
app.get('/get-classes', ensureLogged, require('./lambda/class/get-classes'));
app.get('/profile', ensureLogged, require('./lambda/get-profile'));
app.get('/all-subjects', ensureLogged, ensureAdmin, require('./lambda/subject/get-all-subjects'));
app.get('/all-students', ensureLogged, require('./lambda/get-all-students'));
app.get('/all-teachers', ensureLogged, require('./lambda/get-all-users'));

// class
app.post('/class', ensureLogged, require('./lambda/class/create-class'));

// Apis for Mobile
app.get('/subjects', ensureLogged, require('./lambda/subject/get-subjects'));
app.get('/subjects/:subject_id/classes', ensureLogged, require('./lambda/class/get-classes'));
app.get('/classes/:class_id/students', ensureLogged, require('./lambda/get-students'));
app.get('/students/:id', ensureLogged, require('./lambda/get-student'));

// subject
app.post(
  '/subject',
  ensureLogged,
  ensureAdmin,
  require('./lambda/subject/add-subject')
);
app.get('/subjects', ensureLogged, require('./lambda/subject/get-subjects'));

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
    error_code,
  };
  res.json(data);
});

module.exports = app;
