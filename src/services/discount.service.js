'use strict'

const discountRepository = require("../repositories/discount.repository")

class DiscountService {

    static createNewDiscount(payload) {
        return discountRepository.createDiscount(payload)
    }

}

module.exports = DiscountService
