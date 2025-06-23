'use strict'

const reasonPhrases = require("./reasonPhrases")
const statusCode = require("./statusCode")

class SuccessResponse {

    constructor({message, status = statusCode.OK, reason = reasonPhrases.OK, metadata = {}}){
        this.message = !message ? reason : message
        this.status = status,
        this.metadata = metadata 
    }

    send( res, headers = {}) {
        return res.status(this.status).json(this)
    }
}

class OKSuccessResponse extends SuccessResponse {
    
    constructor({message, metadata}){
        super({message, metadata})
    }
}

class CreatedSuccessResponse extends SuccessResponse {

    constructor({message, status = statusCode.CREATED, reason = reasonPhrases.CREATED, metadata}){
        super({message, status, reason, metadata})
    }
}

class NoContentSuccessResponse extends SuccessResponse {
    constructor({message, status = statusCode.NO_CONTENT, reason = reasonPhrases.NO_CONTENT, metadata}){
        super({message, status, reason, metadata})
    }
}


module.exports = {
    OKSuccessResponse,
    CreatedSuccessResponse,
    NoContentSuccessResponse,
};

