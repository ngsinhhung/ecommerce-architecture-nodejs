'use strict'

const { CreatedSuccessResponse, OKSuccessResponse } = require("../core/success.response")
const productFactory = require("../services/product.service")

class ProductController {

    createNewProduct = async (req, res, next) => {
        new CreatedSuccessResponse({
            message: "Product Created Successfully",
            metadata: await productFactory.createNewProduct({
                ...req.body,
                product_shop: req.user.userId
            })
        }).send(res)
    }

    /**
     * @description: Controller get all product draft for shopuser
     * @param {Number} limit 
     * @param {Number} skip
     * @return {JSON}
     */
    getListProductDraft = async (req, res, next) => {
        new OKSuccessResponse({
            message: "Get List Products Draft Successfully",
            metadata: await productFactory.findAllProductDraft({
                product_shop: req.user.userId,
                skip: req.body.skip,
                limit: req.body.limit
            })
        }).send(res)
    }

    getListProductPublish = async (req, res, next) => {
        new OKSuccessResponse({
            message: "Get List Products Publish Successfully",
            metadata: await productFactory.findAllProductPublish({
                product_shop: req.user.userId,
                skip: req.body.skip,
                limit: req.body.limit
            })
        }).send(res)
    }

    publishProductByShop = async (req, res, next) => {
        new OKSuccessResponse({
            message: "Publish Product Successfully",
            metadata: await productFactory.publishProductByShop({
                product_shop: req.user.userId,
                product_id: req.query.productId
            })
        }).send(res)
    }

    unpublishProductByShop = async (req, res, next) => {
        new OKSuccessResponse({
            message: "Unpublish Product Successfully",
            metadata: await productFactory.unpublishProductByShop({
                product_shop: req.user.userId,
                product_id: req.query.productId
            })
        }).send(res)
    }

}

module.exports = new ProductController()
