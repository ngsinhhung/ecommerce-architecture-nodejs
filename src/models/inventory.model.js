'use strict'

const { Schema, model } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Inventory'
const COLLECTION_NAME = 'Inventoris'

// Declare the Schema of the Mongo model
var inventorySchema = Schema({
    inventory_productId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Product'
    },
    inventory_location:{
        type:String,
        default: "Warehouse HCM"
    },
    inventory_stock:{
        type:Number,
        required:true,
    },
    inventory_shop:{
        type:Schema.Types.ObjectId,
        require: true,
        ref: 'Shop'
    },
    inventory_reservation:{
        type: Array,
        default: []
    }
},{
    collection: COLLECTION_NAME,
    timestamps: true
});

//Export the model
module.exports = model(DOCUMENT_NAME, inventorySchema);