'use strict'

const keyModel = require("../models/key.model")


class KeyTokenService {

    static createKeyToken = async ({userId, publicKey, privateKey}) => {
        try {
            const tokens = await keyModel.create({
                user: userId,
                publicKey: publicKey,
                privateKey: privateKey
            })
            return tokens ? tokens.publicKey : null
        } catch (error) {
            
        }
    }
}

module.exports = KeyTokenService