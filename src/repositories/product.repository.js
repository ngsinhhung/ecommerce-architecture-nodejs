'use strict'

const { update } = require("lodash");
const { product, clothes, electronics, furnitures } = require("../models/product.model");

const findAllProductDraftRepository = async ({ query, skip, limit }) => {
    return await queryProduct({ query, skip, limit })

}

const findAllProductPublishRepository = async ({ query, skip, limit }) => {
    return await queryProduct({ query, skip, limit })
}

const findProductByShopIdAndId = async ({ product_shop, product_id }) => {
    return await product.findOne({ product_shop, product_id }).lean()
}

const updateProductById = async (productUpdate) => {
    return await product.updateOne({product_id: productUpdate.product_id}, productUpdate)
}

const queryProduct = async ({ query, skip, limit }) => {
    return await product.find(query)
                        .populate('product_shop', 'name email -_id')
                        .sort({updateAt: -1})
                        .skip(skip)
                        .limit(limit)
                        .lean()
                        .exec()
}

module.exports = {
    findAllProductDraftRepository,
    findAllProductPublishRepository,
    findProductByShopIdAndId,
    updateProductById,
};
