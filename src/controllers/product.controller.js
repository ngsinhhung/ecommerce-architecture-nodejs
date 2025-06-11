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
    getListProductDraftByShop = async (req, res, next) => {
        new OKSuccessResponse({
            message: "Get List Products Draft Successfully",
            metadata: await productFactory.findListProductsDraftByShop({
                product_shop: req.user.userId,
                skip: req.body.skip,
                limit: req.body.limit
            })
        }).send(res)
    }

    getListProductPublishByShop = async (req, res, next) => {
        new OKSuccessResponse({
            message: "Get List Products Publish Successfully",
            metadata: await productFactory.findListProductsPublishByShop({
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

    getSearchProduct = async(req, res, next) => {
        new OKSuccessResponse({
            message: "Get List Search Product Successfully",
            metadata: await productFactory.searchProductPublish({
                keySearch: req.query.search
            })
        }).send(res)
    }
    

    getAllProducts = async (req, res, next) => {
        new OKSuccessResponse({
            message: "Get All Products Successfully",
            metadata: await productFactory.getAllProducts(req.query)
        }).send(res)
    }

    getProductDetail = async (req, res, next) => {
        new OKSuccessResponse({
            message: "Get Product Detail Successfully",
            metadata: await productFactory.getProductDetail({
                product_id: req.params.productId,
            })
        }).send(res)
    }

    updateProduct = async (req, res, next) => {
        new OKSuccessResponse({
            message: "Update Product Successfully",
            metadata: await productFactory.updateProduct({
                product_shop: req.user.userId,
                product_id: req.params.productId,
                payload: req.body
            })
        }).send(res)
    }

}

module.exports = new ProductController()
