'use strict'

const _ = require('lodash');
const crypto = require('node:crypto');

const getInforShop = (fields = [], obbject = {}) => {
    return _.pick(obbject, fields)
}

const generatePairKey = () => {
    const privateKey = crypto.randomBytes(64).toString('hex')
    const publicKey = crypto.randomBytes(64).toString('hex')

    return {privateKey, publicKey}
}

const getSelectData = (select = []) => {
    return Object.fromEntries(select.map(item => [item, 1]))
}

const unselectData = (select = []) => {
    return Object.fromEntries(select.map(item => [item, 0])) 
}

module.exports = {
    getInforShop,
    generatePairKey,
    getSelectData,
    unselectData
};
