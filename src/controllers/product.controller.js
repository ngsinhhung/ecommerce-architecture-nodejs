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
    getAllProductDraft = async (req, res, next) => {
        new OKSuccessResponse({
            message: "Get All Product Draft Successfully",
            metadata: await productFactory.findAllProductDraft({
                product_shop: req.user.userId,
                skip: req.body.skip,
                limit: req.body.limit
            })
        }).send(res)
    }

}

module.exports = new ProductController()
