'use strict'

const { clothes } = require("../models/product.model")

class ClothesRepository {
    static updateClothesById({ productId, dataUpdate }) {
        return clothes.findByIdAndUpdate(productId, dataUpdate, { new: true})
    }
}

module.exports = ClothesRepository
