'use strict'

const joi = require('joi');

const createDiscountSchema = joi.object({
    discount_name: joi.string().required().trim(),
    discount_code: joi.string().required().trim().uppercase(),
    discount_description: joi.string().trim().optional(),
    discount_type: joi.string().valid('percentage', 'fixed').required(),
    discount_value: joi.number().min(0).required(),
    discount_min_order_amount: joi.number().min(0),
    discount_max_amount: joi.number().min(0).allow(null),
    discount_applicable_categories: joi.array().items(joi.string().trim()).optional(),
    discount_applicable_products: joi.array().items(joi.string().trim()).optional(),
    discount_start_date: joi.date().required(),
    discount_end_date: joi.date().greater(joi.ref('discount_start_date')).required(),
    discount_usage_limit: joi.number().min(0).allow(null),
    discount_is_active: joi.boolean().default(true).required(),
    discount_max_used_per_user: joi.number().min(0).required(),
    discount_appliable_to: joi.string().valid('all', 'specific').required(),
})

module.exports = {
    createDiscountSchema
};

