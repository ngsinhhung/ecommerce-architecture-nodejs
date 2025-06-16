'use strict'

const { BadRequestError } = require("../core/error.response");
const { checkDateBefore, checkDateBeforeDate } = require("../helpers/dateHelper");
const discountRepository = require("../repositories/discount.repository")

class DiscountService {

    static async createNewDiscount(payload) {
        if(this.vadidateDiscount(payload)) {
            return await discountRepository.createDiscount(payload)
        }
        throw new BadRequestError("Error: Invalid Request")
    }

    static async updateDiscountByShop({userId, discountId, payload}) {
        const discount = await discountRepository.findByIdAndShopId({shopId: userId, discountId: discountId})
        if(!discount) {
            throw new BadRequestError("Error: Discount NOT FOUND")
        }

        return await discountRepository.updateDiscount({discountId, payload})
    }

    static async deleteDiscountByShop({userId, discountId}) {
        const discount = await discountRepository.findByIdAndShopId({shopId: userId, discountId: discountId})
        if(!discount) {
            throw new BadRequestError("Error: Discount NOT FOUND")
        }

        const { deleteCount } = await discountRepository.deleteDiscount(discount._id)


        return { deleteCount }
    }

    static vadidateDiscount(discount) {
        if(!checkDateBeforeDate(discount.discount_start_date, discount.discount_end_date)){
            throw new BadRequestError("Error: Invalid Request")
        }

        if(checkDateBefore(discount.discount_end_date) && discount.discount_is_active === true) {
            throw new BadRequestError("Error: Discount must be inactive because end date in the past")
        }

        return true
    }

}

module.exports = DiscountService
