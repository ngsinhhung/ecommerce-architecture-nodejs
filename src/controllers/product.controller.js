'use strict'

const { CreatedSuccessResponse } = require("../core/success.response")
const productFactory = require("../services/product.service")

class ProductController {

    createNewProduct = async (req, res, next) => {
        new CreatedSuccessResponse({
            message: "Product Created Successfully",
            metadata: await productFactory.createNewProduct(req.body)
        }).send(res)
    }

}

module.exports = new ProductController()
