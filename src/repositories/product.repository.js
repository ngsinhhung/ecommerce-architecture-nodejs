'use strict'

const { product, clothes, electronics, furnitures } = require("../models/product.model");
const { getSelectData, unselectData } = require("../utils");

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
        return await product.findOne({ 
            _id: product_id,
            product_shop: product_shop, 
        }).lean()
    }

    static async updateProductById(productUpdate) {
        return await product.updateOne({_id: productUpdate._id}, productUpdate)
    }

    static async findByIdAndUpdate({ productId, productUpdate }) {
        return await product.findByIdAndUpdate(productId, productUpdate, {new: true})
    }

    static async getAllProducts({ limit, sort, page, filter, select }) {
        const skip = (page - 1) * limit
        const sortBy = sort === 'ctimne' ? { _id: -1 } : { _id: 1 }
        const products = await product.find(filter)
                                .sort(sortBy)
                                .skip(skip)
                                .limit(limit)
                                .select(getSelectData(select))
                                .lean()
        
        return products
    }

    static async getProductById({ product_id, unselect }) {
        return await product.findById(product_id).select(unselectData(unselect)).lean()
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
