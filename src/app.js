const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// init middleware
app.use(morgan('dev'));
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// init db
require('./dbs/init.mongodb')
const { checkOverloadConnect } = require('./helpers/check.connect')
checkOverloadConnect()

// init router
app.use('', require('./routers'))

// middle ware
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

// handle error
app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'Error',
        code: statusCode,
        message: error.message || 'Server Internal Error'
    })
})

module.exports = app 