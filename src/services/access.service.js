'use strict'

const shopModel = require("../models/shop.model");
const crypto = require('node:crypto');
const bcrypt = require('bcrypt');
const keyTokenService = require("./keyToken.service");
const createTokenPair = require("../auth/auth");
const { getInforShop, generatePairKey } = require("../utils");
const { BadRequestError, UnauthorizedError } = require("../core/error.response");
const shopService = require("./shop.service");

const RolesShop = {
    WRITEN: 'WRITEN',
    EDITOR: 'EDITOR',
    
}

class AccessService {

    static logIn = async ({email, password}) => {
        const shop = await shopService.findByEmail(email)
        if(!shop) {
            throw new UnauthorizedError("Error: Email or Password is invalid")
        }
        
        const validPassword = bcrypt.compare(password, shop.password)
        if(!validPassword){
            throw new UnauthorizedError("Error: Email or Password is invalid")
        }
        
        const {privateKey, publicKey} = generatePairKey()

        const token = await createTokenPair(
            {
                userId: shop._id,
                email
            },
            publicKey,
            privateKey
        )

        await keyTokenService.createKeyToken({
            userId: shop._id,
            publicKey,
            privateKey,
            refreshToken: token.refreshToken
        })

        return {
            shop: getInforShop(['_id', 'name', 'email', 'verify', 'status', 'createdAt'], shop),
            tokens: token
        }
    }

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