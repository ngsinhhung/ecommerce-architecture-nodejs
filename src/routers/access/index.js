'use strict'

const express = require('express');
const accessController = require('../../controllers/access.controller');
const { apiKey, permission, asyncHandler } = require('../../auth/checkAuth');
const router = express.Router()

// check api key
router.use(apiKey)

// check permission
router.use(permission('0000'))

//SignUP
router.post('/shop/signup', asyncHandler(accessController.signUp));

module.exports = router