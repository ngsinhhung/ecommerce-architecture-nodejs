'use strict'

const { BadRequestError } = require("../core/error.response")

const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body)

        if (error) {
            console.log(error);
            throw new BadRequestError(`Error: ${error.message}`)
        }
        next()
    }
}

module.exports = validationMiddleware
