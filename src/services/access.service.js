'use strict'

const shopModel = require("../models/shop.model");
const crypto = require('node:crypto');
const bcrypt = require('bcrypt');
const keyTokenService = require("./keyToken.service");
const createTokenPair = require("../auth/auth");
const { getInforShop } = require("../utils");
const { BadRequestError } = require("../core/error.response");

const RolesShop = {
    WRITEN: 'WRITEN',
    EDITOR: 'EDITOR',
    
}

class AccessService {

    static signUp = async ({ name, email, password }) => {
        // try {            
            const shopHolder = await shopModel.findOne({email}).lean()
            if(shopHolder){
                throw new BadRequestError('Error: Shop already exits')
            }
            
            const passwordHash = await bcrypt.hash(password, 10)
            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RolesShop.EDITOR, RolesShop.WRITEN],
            })

            if (newShop){
                // const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
                //     modulusLength: 4096,
                //     publicKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     },
                //     privateKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     }
                // })

                const privateKey = crypto.randomBytes(64).toString('hex')
                const publicKey = crypto.randomBytes(64).toString('hex')

                const key = await keyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                })

                if(!key) {
                    throw new BadRequestError('Error: Error while create public key')
                    // return {
                    //     'message': 'Error while create public key'
                    // }
                }
                
                //create token pair
                const token = await createTokenPair(
                    {
                        userId: newShop._id,
                        email
                    },
                    publicKey,
                    privateKey
                )

                return {
                    'status': 'Created Successfully',
                    'metadata': {
                        shop: getInforShop(['_id', 'name', 'email', 'verify', 'status', 'createdAt'], newShop),
                        tokens: token
                    }
                }
            }

                return InternalServerError('Error: shop sign up error')
            
        // } catch (error) {
        //     return {
        //         'status': 'error',
        //         'message': error.message
        //     }
        // }
    }
}

module.exports = AccessService