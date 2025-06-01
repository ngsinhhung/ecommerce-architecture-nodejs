'use strict'

const reasonPhrases = require("./reasonPhrases")
const statusCode = require("./statusCode")

class ErrorResponse extends Error {

    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class InternalServerError extends ErrorResponse {
    constructor(message = reasonPhrases.INTERNAL_SERVER_ERROR, status = statusCode.INTERNAL_SERVER_ERROR){
        super(message, status)
    }
}

class ConfictRequestError extends ErrorResponse {
    constructor(message = reasonPhrases.CONFLICT, status = statusCode.CONFLICT){
        super(message, status)
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = reasonPhrases.BAD_REQUEST, status = statusCode.BAD_REQUEST) {
        super(message, status)
    }
}

class UnauthorizedError extends ErrorResponse {
    constructor(message = reasonPhrases.UNAUTHORIZED, status = statusCode.UNAUTHORIZED) {
        super(message, status)
    }
}

class ForbiddenError extends ErrorResponse {
    constructor(message = reasonPhrases.FORBIDDEN, status = statusCode.FORBIDDEN) {
        super(message, status)
    }
}

module.exports = {
    ConfictRequestError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
};
