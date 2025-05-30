'use strict'

const { default: mongoose } = require("mongoose")
const os = require('os')
const process = require('process')
const _SECOND = 5000

//count connect
const countConnect = () => {
    const numConnect = mongoose.connections.length
    console.log(`Numbers of connection: ${numConnect}`);
}

//check overload connect every 5min
const checkOverloadConnect = () => {
    setInterval(() => {
        const numConnect = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss

        console.log(`Active connection: ${numConnect}`);
        console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);
        

        const maxConnections = numCores * 5 // One core can handle five connection
        if(numConnect > maxConnections - 20) {
            console.log("Detected server overload connection database");
        }

    }, _SECOND)
}

module.exports = {
    countConnect,
    checkOverloadConnect
}