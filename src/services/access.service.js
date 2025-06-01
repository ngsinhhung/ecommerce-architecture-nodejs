'use strict'

const shopModel = require("../models/shop.model");
const crypto = require('node:crypto');
const bcrypt = require('bcrypt');
const keyTokenService = require("./keyToken.service");
const createTokenPair = require("../auth/auth");
const { getInforShop } = require("../utils");

const RolesShop = {
    WRITEN: 'WRITEN',
    EDITOR: 'EDITOR',
    
}

class AccessService {

    static signUp = async ({ name, email, password }) => {
        try {
            console.log({ name, email, password });
            
            const shopHolder = await shopModel.findOne({email}).lean()
            if(shopHolder){
                return {
                    'message': 'Shop already exits'
                }
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
                    return {
                        'message': 'Error while create public key'
                    }
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
                    'status': 'created successfully',
                    'metadata': {
                        shop: getInforShop(['_id', 'name', 'email', 'verify', 'status', 'createdAt'], newShop),
                        tokens: token
                    }
                }
            }

            return {
                'status': 'created failure',
                'metadata': null
            }

            
        } catch (error) {
            return {
                'status': 'error',
                'message': error.message
            }
        }
    }
}

module.exports = AccessService