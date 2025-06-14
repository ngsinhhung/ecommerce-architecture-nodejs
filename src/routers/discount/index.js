'use strict'

const express = require('express');
const { authentication } = require('../../auth/auth');
const asyncHandler = require('../../helpers/asyncHandler');
const discountController = require('../../controllers/discount.controller');
const validationMiddleware = require('../../middleware/validation.middleware');
const { createDiscountSchema } = require('../../validation/discount.validation');


const privateDiscountRouter = express.Router()


privateDiscountRouter.post('/shop/discount', validationMiddleware(createDiscountSchema), asyncHandler(discountController.createNewDiscount))

module.exports = {privateDiscountRouter}