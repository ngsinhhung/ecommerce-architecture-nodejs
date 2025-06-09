'use strict'

const { update } = require("lodash");
const { product, clothes, electronics, furnitures } = require("../models/product.model");

class ProductRepository {

    static async getSearchProductPublish(keySearch) {
        return await product.find({
            isPublished: true,
            $text: { $search: keySearch}
        }, {
            score: {
                $meta: 'textScore'
            }
        }).sort({score: {$meta: 'textScore'}}).lean()
    }

    static async getListProductsDraft({ query, skip, limit }) {
        return await this.queryProduct({ query, skip, limit })
    }

    static async getListProductsPublish({query, skip, limit}) {
        return await this.queryProduct({ query, skip, limit })
    }

    static async findProductByShopIdAndId({ product_shop, product_id }) {
        return await product.findOne({ product_shop, product_id }).lean()
    }

    static async updateProductById(productUpdate) {
        return await product.updateOne({product_id: productUpdate.product_id}, productUpdate)
    }

    static async queryProduct({ query, skip, limit }) {
        return await product.find(query)
                            .populate('product_shop', 'name email -_id')
                            .sort({updateAt: -1})
                            .skip(skip)
                            .limit(limit)
                            .lean()
                            .exec()
    }
}

module.exports = ProductRepository
