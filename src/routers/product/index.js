'use strict'

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/auth');
const productController = require('../../controllers/product.controller');


const productRouter = express.Router()

productRouter.use(authentication)

productRouter.post('/shop/product', asyncHandler(productController.createNewProduct))

//Product Draft
productRouter.get('/shop/product-draft', asyncHandler(productController.getListProductDraft))

//Product Publish
productRouter.get('/shop/product-publish', asyncHandler(productController.getListProductPublish))
productRouter.patch('/shop/product-publish', asyncHandler(productController.publishProductByShop))

module.exports = productRouter
