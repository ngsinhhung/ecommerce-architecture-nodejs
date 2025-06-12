'use strict'

const { Schema, model } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Discount'
const COLLECTION_NAME = 'Discounts'

// Declare the Schema of the Mongo model
var discountSchema = Schema({
    discount_name: {
        type: String,
        required: true,
        trim: true
    },
    discount_code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    },
    discount_description: {
        type: String,
        trim: true,
    },
    discount_type: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true,
    },
    discount_value: {
        type: Number,
        required: true,
        min: 0,
    },
    discount_min_order_amount: {
        type: Number,
        default: 0,
        min: 0,
    },
    discount_max_amount: {
        type: Number,
        default: null,
    },
    discount_applicable_categories: [{
        type: String,
        trim: true,
    }],
    discount_applicable_products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    discount_start_date: {
        type: Date,
        required: true,
    },
    discount_end_date: {
        type: Date,
        required: true,
    },
    discount_usage_limit: {
        type: Number,
        default: null,
    },
    discount_usaed_count: {
        type: Number,
        default: 0,
    },
    discount_is_active: {
        type: Boolean,
        default: true,
    },
    discount_by_shopId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    discount_used_by_user: {
        type: Array,
        default: [],
    },
    discount_max_used_per_user: {
        type: Number,
        require: true,
    },
    discount_appliable_to: {
        type: String,
        require: true,
        enum: ['all', 'specific']
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

//Export the model
module.exports = model(DOCUMENT_NAME, discountSchema);
