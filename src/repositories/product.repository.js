'use strict'

const { update } = require("lodash");
const { product, clothes, electronics, furnitures } = require("../models/product.model");

const findAllProductDraftRepository = async ({ query, skip, limit }) => {
    return await product.find(query)
                        .populate('product_shop', 'name email -_id')
                        .sort({updateAt: -1})
                        .skip(skip)
                        .limit(limit)
                        .lean()
                        .exec()

}

module.exports = {
    findAllProductDraftRepository
};
