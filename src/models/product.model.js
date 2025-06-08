'use strict'

const { Schema, model } = require('mongoose'); // Erase if already required

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
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

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