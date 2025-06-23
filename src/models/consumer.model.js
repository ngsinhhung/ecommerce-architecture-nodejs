'use strict';

const { Schema, model } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Consumer'
const COLLECTION_NAME = 'Consumers'

// Declare the Schema of the Mongo model
var consumerSchema = new Schema({
    name:{
        type:String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    status: {
        type:String,
        enum:['active', 'inactive'],
        default: 'inactive',
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, consumerSchema);