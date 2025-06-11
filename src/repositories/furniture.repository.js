'use strict'

const { furnitures } = require("../models/product.model")

class FurnitureRepository {
    static updateFurnitureById({ productId, dataUpdate }) {
        return furnitures.findByIdAndUpdate(productId, dataUpdate, { new: true})
    }
}

module.exports = FurnitureRepository