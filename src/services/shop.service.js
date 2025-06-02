'use strict'

const shopModel = require("../models/shop.model")


class ShopService {

    findByEmail = async ( email, select = {
        email: 1, password: 2, name: 1, role: 1
    }) => {
        return await shopModel.findOne({email}).select(select).lean()

    }
}

module.exports = new ShopService()
