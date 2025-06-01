'use strict'

const keyModel = require("../models/key.model")


class KeyTokenService {

    static createKeyToken = async ({userId, publicKey}) => {
        try {
            const publicKeyString = publicKey.toString()

            const tokens = await keyModel.create({
                user: userId,
                publicKey: publicKeyString
            })
            return tokens ? tokens.publicKey : null
        } catch (error) {
            
        }
    }
}

module.exports = KeyTokenService