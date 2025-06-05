'use strict'

const jsonwebtoken = require('jsonwebtoken');
const asyncHandler = require('../helpers/asyncHandler');
const { UnauthorizedError, NotFoundError } = require('../core/error.response');
const keyTokenService = require('../services/keyToken.service');

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization' 
}

const createTokenPair = async ( payload, publicKey, privateKey ) => {
    try {
        //access token
        const accessToken = jsonwebtoken.sign(payload, publicKey, {
            expiresIn: '2 days'
        })

        //refreshToken
        const refreshToken = jsonwebtoken.sign(payload, privateKey, {
            expiresIn: '7 days'
        })

        jsonwebtoken.verify(accessToken, publicKey, (error, decode) => {
            if(error){
                console.error(`Error verify:: ${error}`)
            } else {
                console.log(`Verify Successfully:: `, decode)
            }
        })

        return {accessToken, refreshToken}
    } catch (error) {
        
    }
}

const authentication = asyncHandler( async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID]?.toString()
    if (!userId){
        throw new UnauthorizedError("Error: Invalid Request")
    }

    const keyStore = await keyTokenService.findKeyTokenByUserId(userId)
    if(!keyStore) {
        throw new NotFoundError()
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION]?.toString()
    if(!accessToken) {
        throw new UnauthorizedError("Error: Invalid Request")
    }

    try {
        const decodeUser = jsonwebtoken.verify(accessToken, keyStore.publicKey)
        if(userId !== decodeUser.userId) {
            throw new UnauthorizedError("Error: Invalid User")
        }
        req.keyStore = keyStore
        return next()
    } catch (error) {
        throw error
    }

})

const verifyJWT = async (token, key) => {
    return await jsonwebtoken.verify(token, key)
}

module.exports = { 
    createTokenPair,
    authentication,
    verifyJWT,
}