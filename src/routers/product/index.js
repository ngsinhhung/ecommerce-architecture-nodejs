'use strict'

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/auth');
const productController = require('../../controllers/product.controller');


const publishProductRouter = express.Router()
const privateProductRouter = express.Router()

publishProductRouter.get('', asyncHandler(productController.getAllProducts))
publishProductRouter.get('/product', asyncHandler(productController.getSearchProduct))
publishProductRouter.get('/:productId', asyncHandler(productController.getProductDetail))


privateProductRouter.post('/shop/product', asyncHandler(productController.createNewProduct))
privateProductRouter.patch('/shop/product/:productId', asyncHandler(productController.updateProduct))

//Product Draft
privateProductRouter.get('/shop/product-draft', asyncHandler(productController.getListProductDraftByShop))

//Product Publish
privateProductRouter.get('/shop/product-publish', asyncHandler(productController.getListProductPublishByShop))
privateProductRouter.patch('/shop/product-publish', asyncHandler(productController.publishProductByShop))
privateProductRouter.patch('/shop/product-unpublish', asyncHandler(productController.unpublishProductByShop))

module.exports = {publishProductRouter, privateProductRouter}
