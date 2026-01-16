'use strict'

const inventoryRepository = require("../repositories/inventory.repository")

class InventoryService {

    static createProductInventory = async ({productId, shopId, stock, location}) => {
        return inventoryRepository.insertInventory({productId, shopId, stock, location})
    }


}


module.exports = InventoryService
