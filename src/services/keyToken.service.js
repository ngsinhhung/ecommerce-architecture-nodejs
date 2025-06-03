'use strict'

const keyModel = require("../models/key.model")
const { Types } = require('mongoose');


class KeyTokenService {

    static createKeyToken = async ({userId, publicKey, privateKey, refreshToken }) => {
        try {
            // const tokens = await keyModel.create({
            //     user: userId,
            //     publicKey: publicKey,
            //     privateKey: privateKey
            // })
            // return tokens ? tokens.publicKey : null

            const filter = { user: userId }, update = {
                publicKey,
                privateKey,
                refreshTokensUsed: [],
                refreshToken
            }, option = { new: true, upsert: true }
            const token = await keyModel.findOneAndUpdate(filter, update, option)
            return token ? token.publicKey : null

        } catch (error) {
            
        }
    }

    static findKeyTokenByUserId = async ( userId ) => {
        return await keyModel.findOne({user: Types.ObjectId(userId)}).lean()
    }
}

module.exports = KeyTokenService