'use strict'

const { CreatedSuccessResponse, OKSuccessResponse } = require("../core/success.response")
const discountService = require("../services/discount.service")

class DiscountController {

    createNewDiscount = async (req, res, next) => {
        new CreatedSuccessResponse({
            message: "Discount Created Successfully",
            metadata: await discountService.createNewDiscount({
                ...req.body,
                discount_by_shopId: req.user.userId
            })
        }).send(res)
    }

    updateDiscount = async (req, res, next) => {
        new OKSuccessResponse({
            message: "Discount Updated Successfully",
            metadata: await discountService.updateDiscountByShop({
                userId: req.user.userId,
                discountId: req.query.discountId,
                payload: req.body
            })
        }).send(res)
    }

}

module.exports = new DiscountController()
