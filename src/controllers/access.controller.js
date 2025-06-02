'use strict'

const { CreatedSuccessResponse } = require("../core/success.response")
const accessService = require("../services/access.service")

class AccessController {

    signUp = async (req, res, next) => {
        new CreatedSuccessResponse({
            message: 'Register complete',
            metadata: await accessService.signUp(req.body)
        }).send(res)
    }
}

module.exports = new AccessController()