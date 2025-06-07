'use strict'

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/auth');
const productController = require('../../controllers/product.controller');


const productRouter = express.Router()

productRouter.use(authentication)

productRouter.post('/shop/product', asyncHandler(productController.createNewProduct))

module.exports = productRouter
