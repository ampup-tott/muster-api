'use strict';

require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('Database is Connected!'), () => {
        console.log('Can\'t connect to the Database');
    });