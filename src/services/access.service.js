'use strict'

const shopModel = require("../models/shop.model");
const crypto = require('node:crypto');
const bcrypt = require('bcrypt');
const keyTokenService = require("./keyToken.service");
const { createTokenPair, verifyJWT } = require("../auth/auth");
const { getInforShop, generatePairKey } = require("../utils");
const { BadRequestError, UnauthorizedError, ForbiddenError } = require("../core/error.response");
const shopService = require("./shop.service");

const RolesShop = {
    WRITEN: 'WRITEN',
    EDITOR: 'EDITOR',
    
}

class AccessService {

    static handleRefreshToken = async ( refreshToken ) => {
        const tokenUsed = await keyTokenService.findRefreshTokenUsed(refreshToken)
        if(tokenUsed) {
            const {email, userId} = await verifyJWT(refreshToken, tokenUsed.privateKey)

            console.log(`Warning: ${{email, userId}}`);

            await keyTokenService.deleteKeyTokenById(tokenUsed._id)
            throw new ForbiddenError("Something when wrong! Please login again")
        }

        const keyStore = await keyTokenService.findKeyTokenByRefreshToken(refreshToken)
        if(!keyStore) {
            throw new UnauthorizedError("Error: User not login before")
        }

        const {email, userId} = await verifyJWT(refreshToken, keyStore.privateKey)

        console.log('[2]--::' + {email, userId});
        

        const shopUser = await shopService.findByEmail(email)
        if(!shopUser){
            throw new UnauthorizedError("Error: Unauthorized")
        }

        //create new Access Token and Refresh Token
        const token = await createTokenPair(
            {
                userId,
                email
            },
            keyStore.publicKey,
            keyStore.privateKey
        )

        await keyTokenService.updateKeyTokenById(keyStore._id, token.refreshToken , keyStore.refreshToken)
        return {
            user: {
                userId,
                email
            },
            token
        }
    }

    static logOut = async ( keyStore ) => {
        return await keyTokenService.removeKeyTokenById(keyStore._id)
    }

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