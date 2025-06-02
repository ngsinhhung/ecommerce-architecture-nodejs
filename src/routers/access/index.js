'use strict'

const express = require('express');
const accessController = require('../../controllers/access.controller');
const { apiKey, permission, asyncHandler } = require('../../auth/checkAuth');
const router = express.Router()

router.post('/shop/signup', asyncHandler(accessController.signUp));
router.post('/shop/login', asyncHandler(accessController.logIn))

module.exports = router