'use strict'

const express = require('express');
const accessController = require('../../controllers/access.controller');
const asyncHandler = require('../../helpers/asyncHandler');
const privateAccessRouter = express.Router()
const publishAccessRouter = express.Router()

publishAccessRouter.post('/shop/signup', asyncHandler(accessController.signUp));
publishAccessRouter.post('/shop/login', asyncHandler(accessController.logIn))

//authentication
privateAccessRouter.post('/shop/logout', asyncHandler(accessController.logOut))
privateAccessRouter.post('/shop/handle-refresh-token', asyncHandler(accessController.handerRefreshToken))

module.exports = {publishAccessRouter, privateAccessRouter}