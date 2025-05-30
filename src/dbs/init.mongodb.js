'use strict';

const mongoose = require('mongoose');
const { db: { port, hostname, username, password, name }} = require('../configs/config.mongodb')
const connectString = `mongodb://${username}:${password}@${hostname}:${port}/`
const { countConnect } = require('../helpers/check.connect')


class Database {
    constructor() {
        this.connect();
    }

    connect(type = 'mongodb') {
        if(1===1){
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true })
        }

        console.log(`DB Connect String: ${connectString}`);
        

        mongoose.connect(connectString).then( _ => {
            console.log('MongoDB connected successfully');
            countConnect()
        })
        .catch(err => {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        });
    }

    static getInstance() {
        if(!Database.instance){
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongoDB = Database.getInstance()
module.exports = instanceMongoDB