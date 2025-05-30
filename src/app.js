const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

// init middleware
app.use(morgan('dev'));
app.use(helmet())
app.use(compression())

// init db
require('./dbs/init.mongodb')
const { checkOverloadConnect } = require('./helpers/check.connect')
checkOverloadConnect()
// init router

// handle error

module.exports = app 