'use strict'

const { Types } = require("mongoose")
const inventoryModel = require("../models/inventory.model")


class InventoryRepository {

    static insertInventory = async ({productId, shopId, stock, location = "unknow"}) => {

        return await inventoryModel.insertOne({
            inventory_productId: new Types.ObjectId(productId),
            inventory_shop: new Types.ObjectId(shopId),
            inventory_stock: stock,
            inventory_location: location
        })
    }
}

module.exports = InventoryRepository
