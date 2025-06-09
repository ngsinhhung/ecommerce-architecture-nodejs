'use strict'

const { UnauthorizedError, ForbiddenError } = require("../core/error.response")
const apikeyServices = require("../services/apikey.services")

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization' 
}

const apiKey = async (req, res, next) => {
    // try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        if(!key){
            throw new UnauthorizedError()
            // return res.status(403).json({
            //     message: "Forbidden Error"
            // })
        }

        const objKey = await apikeyServices.findById(key)
        if (!objKey) {
            throw new UnauthorizedError()
            // return res.status(403).json({
            //     message: "Forbidden Error"
            // })
        }

        req.objectKey = objKey
        return next()
    // } catch (error) {

    //     return res.status(500).json({
    //             message: "Internal Server Error"
    //         })
    // }

}

const permission = ( permission ) => {
    return (req, res, next) => {
        if(!req.objectKey.permissions){
            throw new ForbiddenError()
        }
        const validPermission = req.objectKey.permissions.includes(permission)
        if(!validPermission) {
            throw new ForbiddenError()
        }
        return next()
    }
}

module.exports = {
    apiKey,
    permission,
};
