'use strict'

const discountModel = require("../models/discount.model")



class DiscountRepository {

    static async createDiscount (payload) {
        return await discountModel.create(payload)
    }

}

module.exports = DiscountRepository
