'use strict'

const _ = require('lodash');

const getInforShop = (fields = [], obbject = {}) => {
    return _.pick(obbject, fields)
}

module.exports = {
    getInforShop,
};
