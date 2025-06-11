'use strict'

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/auth');
const productController = require('../../controllers/product.controller');


const productRouter = express.Router()

productRouter.get('/product', asyncHandler(productController.getSearchProduct))
productRouter.get('', asyncHandler(productController.getAllProducts))
productRouter.get('/:productId', asyncHandler(productController.getProductDetail))

productRouter.use(authentication)

productRouter.post('/shop/product', asyncHandler(productController.createNewProduct))
productRouter.patch('/shop/product/:productId', asyncHandler(productController.updateProduct))

//Product Draft
productRouter.get('/shop/product-draft', asyncHandler(productController.getListProductDraftByShop))

//Product Publish
productRouter.get('/shop/product-publish', asyncHandler(productController.getListProductPublishByShop))
productRouter.patch('/shop/product-publish', asyncHandler(productController.publishProductByShop))
productRouter.patch('/shop/product-unpublish', asyncHandler(productController.unpublishProductByShop))

module.exports = productRouter
