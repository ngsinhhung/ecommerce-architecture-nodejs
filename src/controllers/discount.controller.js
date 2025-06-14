'use strict'

const { CreatedSuccessResponse } = require("../core/success.response")
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


}

module.exports = new DiscountController()
