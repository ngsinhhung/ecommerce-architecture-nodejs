'use strict'

const { BadRequestError } = require("../core/error.response");
const { checkDateBefore, checkDateBeforeDate } = require("../helpers/dateHelper");
const discountRepository = require("../repositories/discount.repository")

class DiscountService {

    static async createNewDiscount(payload) {
        const discount = await discountRepository.findByDiscountCodeAndShopId({
            discountCode:payload.discount_code,
            shopId: payload.discount_by_shopId
        })

        if(discount) {
            throw new BadRequestError("Error: Discount Code Readly Exist")
        }

        if(!this.vadidateDiscount(payload)) {
            throw new BadRequestError("Error: Discount Invalid Request")
        }
        return await discountRepository.createDiscount(payload)
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
