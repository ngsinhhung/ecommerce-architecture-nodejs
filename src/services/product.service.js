'use strict'

const { product, clothes, electronics, furnitures} = require('../models/product.model');
const { BadRequestError } = require("../core/error.response");


class ProductFactory {

    static productRegister = {}

    static registerProductType(type, classRef) {
        this.productRegister[type] = classRef
    }

    static createNewProduct(productData) {
        const productClass = this.productRegister[productData.product_type]
        if(!productClass){
            throw new BadRequestError(`Error: Invalid Product Type::: ${productData.product_type}`)
        }
        return new productClass(productData).createNewProduct()
        // switch(productData.product_type) {
        //     case 'Clothes':
        //         return new Clothes(productData).createNewClothesProduct()
        //     case 'Electronics':
        //         return new Electronic(productData).createNewElectronicProduct()
        //     default:
        //         throw new BadRequestError(`Error: Invalid Product Type::: ${productData.product_type}`)

        // }
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

    async createNewProduct( product_id ) {
        return await product.create({
            ...this,
            _id: product_id
        })  
    }
}

class Clothes extends Product {

    createNewProduct = async () => {
        const newClothes = await clothes.create({
            ...this.product_attributes,
            shop: this.product_shop
        })
        if(!newClothes) {
            throw new BadRequestError('Error: Error while create new clothes')
        }

        const newProduct = await super.createNewProduct(newClothes._id)
        if(!newProduct){
            throw new BadRequestError('Error: Error while create new product')
        }

        return newProduct
    }
}

class Electronic extends Product {

    createNewProduct = async () => {
        const newElectronic = await electronics.create({
            ...this.product_attributes,
            shop: this.product_shop
        })
        if(!newElectronic) {
            throw new BadRequestError('Error: Error while create new clothes')
        }

        const newProduct = await super.createNewProduct(newElectronic._id)
        if(!newProduct){
            throw new BadRequestError('Error: Error while create new product')
        }

        return newProduct
    }
}

class Furniture extends Product {

    createNewProduct = async () => {
        const newFurniture = await furnitures.create({
            ...this.product_attributes,
            shop: this.product_shop
        })
        if(!newFurniture) {
            throw new BadRequestError('Error: Error while create new clothes')
        }

        const newProduct = await super.createNewProduct(newFurniture._id)
        if(!newProduct){
            throw new BadRequestError('Error: Error while create new product')
        }

        return newProduct
    }
}

ProductFactory.registerProductType('Clothes', Clothes)
ProductFactory.registerProductType('Electronics', Electronic)
ProductFactory.registerProductType('Furnitures', Furniture)


module.exports = ProductFactory