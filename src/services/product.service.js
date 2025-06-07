'use strict'

const { product, clothes, electronics} = require('../models/product.model');
const { BadRequestError } = require("../core/error.response");


class ProductFactory {

    static createNewProduct(productData) {
        switch(productData.product_type) {
            case 'Clothes':
                return new Clothes(productData).createNewClothesProduct()
            case 'Electronics':
                return new Electronic(productData).createNewElectronicProduct()
            default:
                throw new BadRequestError(`Error: Invalid Product Type::: ${productData.product_type}`)

        }
    }
}


class Product {

    constructor ({
        product_name,
        product_thumb,
        product_description,
        product_price,
        product_quantity,
        product_type,
        product_shop,
        product_attributes
    }) {
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_shop = product_shop
        this.product_attributes = product_attributes
    }

    async createNewProduct() {
        return await product.create(this)  
    }
}

class Clothes extends Product {

    createNewClothesProduct = async () => {
        const newClothes = await clothes.create(this.product_attributes)
        if(!newClothes) {
            throw new BadRequestError('Error: Error while create new clothes')
        }

        const newProduct = await super.createNewProduct()
        if(!newProduct){
            throw new BadRequestError('Error: Error while create new product')
        }

        return newProduct
    }
}

class Electronic extends Product {

    createNewElectronicProduct = async () => {
        const newElectronic = await electronics.create(this.product_attributes)
        if(!newElectronic) {
            throw new BadRequestError('Error: Error while create new clothes')
        }

        console.log(this);

        const newProduct = await super.createNewProduct()
        if(!newProduct){
            throw new BadRequestError('Error: Error while create new product')
        }

        return newProduct
    }
}

module.exports = ProductFactory