'use strict'

const express = require('express')
const { apiKey, permission } = require('../auth/checkAuth');
const router = express.Router()

const { authentication } = require('../auth/auth');
const access = require('./access')
const product = require('./product');
const discount = require('./discount')

// check api keyconst access = require('./access')
router.use(apiKey)

// check permission
router.use(permission('0000'))


// publish router
router.use('/v1/api', product.publishProductRouter)
router.use('/v1/api', access.publishAccessRouter)

//private router
router.use(authentication)
router.use('/v1/api', access.privateAccessRouter)
router.use('/v1/api', product.privateProductRouter)
router.use('/v1/api', discount.privateDiscountRouter)

// router.use('/v1/api', require('./product'))
// router.use('/v1/api', require('./access'))


// router.get('/', (req, res, next) => {
//     return res.status(200).json({
//         'message': 'hello world'
//     })
// });

module.exports = router
