'use strict'

const { CreatedSuccessResponse, OKSuccessResponse, NoContentSuccessResponse } = require("../core/success.response")
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

    deleteDiscount = async(req, res, next) => {
        new NoContentSuccessResponse({
            message: "Discount Delete Successfully",
            metadata: await discountService.deleteDiscountByShop({
                userId: req.user.userId,
                discountId: req.query.discountId,
            })
        }).send(res)
    }

}

module.exports = new DiscountController()
