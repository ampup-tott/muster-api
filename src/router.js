'use strict';

const app = require('router')();
const body = require('body-parser');
require('../mongoosefile');

app.use(body.json({ limit: '50mb' }));
app.use(require('./mid/query'));
app.use(require('./mid/json'));


app.get('/', require('./lambda/status'));

module.exports = app;
