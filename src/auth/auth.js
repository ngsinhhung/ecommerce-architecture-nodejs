'use strict'

const jsonwebtoken = require('jsonwebtoken');

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

module.exports = createTokenPair