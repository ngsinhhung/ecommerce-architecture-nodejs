'use strict'

const { Schema, model } = require('mongoose'); // Erase if already required
const { collection } = require('./key.model');

const DOCUMENT_NAME = 'ApiKey'
const COLLECTION_NAME = 'ApiKeys'

// Declare the Schema of the Mongo model
var apiKeySchema = Schema({
    key:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default: true
    },
    permissions:{
        type:[String],
        required:true,
        enum: ['0000', '1111', '2222']
    },
},{
    collection: COLLECTION_NAME,
    timestamps: true
});

//Export the model
module.exports = model(DOCUMENT_NAME, apiKeySchema);