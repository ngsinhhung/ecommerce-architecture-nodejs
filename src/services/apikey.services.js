'use strict'
const crypto = require('node:crypto');
const apikeyModel = require("../models/apikey.model")

class ApiKeyService {
    findById = async ( key ) => {
        try {
            // const newObjKey = await apikeyModel.create({
            //     key: crypto.randomBytes(64).toString('hex'),
            //     permissions: ['0000']
            // })
            // console.log(newObjKey);
            const objectKey = await apikeyModel.findOne({ key, status:true }).lean()
            return objectKey
        } catch (error) {
            return {
                message: "Error get object key" 
            }
        }
    }
}

module.exports = new ApiKeyService()
