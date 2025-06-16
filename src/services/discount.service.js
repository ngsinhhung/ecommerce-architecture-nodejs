'use strict'

const { BadRequestError } = require("../core/error.response");
const discountRepository = require("../repositories/discount.repository")

class DiscountService {

    static async createNewDiscount(payload) {
        return await discountRepository.createDiscount(payload)
    }

    static async updateDiscountByShop({userId, discountId, payload}) {
        console.log({userId, discountId, payload});
        const discount = await discountRepository.findByIdAndShopId({shopId: userId, discountId: discountId})
        if(!discount) {
            throw new BadRequestError("Error: Discount NOT FOUND")
        }

        return await discountRepository.updateDiscount({discountId, payload})
    }

}

module.exports = DiscountService
