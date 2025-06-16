'use strict'

const { Types } = require("mongoose")
const discountModel = require("../models/discount.model")



class DiscountRepository {

    static async findByIdAndShopId({shopId, discountId}) {
        return await discountModel.findOne({
            _id: new Types.ObjectId(discountId),
            discount_by_shopId: shopId
        }).lean()
    }

    static async createDiscount (payload) {
        return await discountModel.create(payload)
    }

    static async updateDiscount({ discountId, payload }) {
        return await discountModel.findOneAndUpdate({ _id: new Types.ObjectId(discountId) }, payload, {new: true}).lean()
    }

    static async deleteDiscount(discountId) {
        return await discountModel.deleteOne({_id: new Types.ObjectId(discountId)})
    }

}

module.exports = DiscountRepository
