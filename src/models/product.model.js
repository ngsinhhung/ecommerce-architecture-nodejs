'use strict'

const { Schema, model } = require('mongoose'); // Erase if already required
const slugify = require('slugify');

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

// Declare the Schema of the Mongo model
const productSchema = new Schema({
    product_name:{
        type:String,
        required:true,
    },
    product_thumb:{
        type:String,
        required:true,
    },
    product_description:{
        type:String,
    },
    product_slug: {
        type: String,
    },
    product_price:{
        type:Number,
        required:true,
    },
    product_quantity:{
        type:Number,
        required:true,
    },
    product_type:{
        type:String,
        required:true,
        enum: ['Clothes', 'Electronics', 'Furnitures']
    },
    product_shop: {
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Shop'
    },
    product_attributes:{
        type: Schema.Types.Mixed,
        require:true
    },
    product_rating_average: {
        type: Number,
        min: [1.0, 'Rating must be above 1.0'],
        min: [5.0, 'Rating must be below 5.0'],
        set: (val) => Math.round(val * 10) / 10
    },
    product_variation: {
        type: Array,
        default: []
    },
    isDraft: {
        type: Boolean,
        default: true,
        index: true,
        select: false,
    },
    isPublished: {
        type: Boolean,
        default: false,
        index: true,
        select: false,
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Document middleware
productSchema.pre('save', function (next){    
    this.product_slug = slugify(this.product_name, {lower: true})
    next()
})

const clothesSchema = new Schema({
    brand: {
        type:String,
        require:true
    },
    size: String,
    material: String,
    shop: {
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Shop'
    },
}, {
    timestamps: true,
    collection: 'Clothes'
})

const electronicsSchema = new Schema({
    manufacturer: {
        type: String,
        require: true,
    },
    model: String,
    color: String,
    shop: {
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Shop'
    },
}, {
    timestamps: true,
    collection: 'Electronics'
})

const furnitureSchema = new Schema({
    manufacturer: {
        type: String,
        require: true,
    },
    material: String,
    color: String,
    shop: {
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Shop'
    },
}, {
    timestamps: true,
    collection: 'Furnitures'
})




//Export the model
module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    clothes: model("Cloth", clothesSchema),
    electronics: model("Electronic", electronicsSchema),
    furnitures: model("Furniture", furnitureSchema)
}