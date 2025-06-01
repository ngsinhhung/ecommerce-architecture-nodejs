'use strict'

const accessService = require("../services/access.service")

class AccessController {

    signUp = async (req, res, next) => {
        return res.status(201).json(await accessService.signUp(req.body))
    }
}

module.exports = new AccessController()