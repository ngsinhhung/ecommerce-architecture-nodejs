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
        return await keyModel.findOne({ user: userId }).lean()
    }

    static removeKeyTokenById = async ( id ) => {
        return await keyModel.deleteOne({
            _id: new Types.ObjectId(id)
        })
    }

    static findRefreshTokenUsed = async ( refreshToken ) => {
        return await keyModel.findOne({ refreshTokensUsed: {refreshToken} }).lean()
    }

    static deleteKeyTokenById = async ( id ) => {
        return await keyModel.findByIdAndDelete({ _id: new Types.ObjectId(id) })
    }

    static findKeyTokenByRefreshToken = async ( refreshToken ) => {
        return await keyModel.findOne({ refreshToken }).lean()
    }

    static updateKeyTokenById = async ( id, refreshToken, refreshTokenUsed ) => {
        return await keyModel.findOneAndUpdate(
            {_id: id},
            {
                $push: {
                    refreshTokensUsed: refreshTokenUsed
                },
                $set: {
                    refreshToken: refreshToken
                }
            }
        )
    }
}

module.exports = KeyTokenService