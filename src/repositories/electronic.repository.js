'use strict'

const { electronics } = require("../models/product.model")

class ElectronicRepository {
    static updateElectronicById({ productId, dataUpdate }) {
        return electronics.findByIdAndUpdate(productId, dataUpdate, { new: true})
    }
}

module.exports = ElectronicRepository