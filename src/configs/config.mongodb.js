'use strict'
require('dotenv').config()

const dev = {
    app: {
        port: process.env.DEV_APP_PORT
    },
    db: {
        port: process.env.DEV_DB_PORT,
        hostname: process.env.DEV_DB_HOST,
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
        name: process.env.DEV_DB_NAME,
    }
}

const prod = {
    app: {
        port: process.env.PROD_APP_PORT
    },
    db: {
        port: process.env.PROD_DB_PORT,
        hostname: process.env.PROD_DB_HOST,
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        name: process.env.PROD_DB_NAME,
    }
}

const config = { dev, prod }
const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]