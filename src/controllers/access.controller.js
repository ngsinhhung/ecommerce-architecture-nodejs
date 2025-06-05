'use strict'

const { CreatedSuccessResponse, OKSuccessResponse } = require("../core/success.response")
const accessService = require("../services/access.service")

class AccessController {

    handerRefreshToken = async (req, res, next) => {
        new OKSuccessResponse({
            message: 'Get Token Successfully',
            metadata: await accessService.handleRefreshToken(req.body.refreshToken)
        }).send(res)
    }

    logIn = async (req, res, next) => {
        new OKSuccessResponse({
            message: 'Login Successfully',
            metadata: await accessService.logIn(req.body)
        }).send(res)
    }

    logOut = async (req, res, next) => {
        new OKSuccessResponse({
            message: 'Logout Successfully',
            metadata: await accessService.logOut(req.keyStore)
        }).send(res)
    }

    signUp = async (req, res, next) => {
        new CreatedSuccessResponse({
            message: 'Register Successfully',
            metadata: await accessService.signUp(req.body)
        }).send(res)
    }
}

module.exports = new AccessController()