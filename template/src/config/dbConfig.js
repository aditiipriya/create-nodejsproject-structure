"use strict"

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const logger = require("../logger");
const appUtils = require("../api/v1/utils/appUtils")
const adminService = require("../api/v1/services/adminService")

// Connect to Db
function connectDb(env, callback) {
    let dbName = env.mongo.dbName;
    let dbUrl = env.mongo.dbUrl;
    let dbOptions = env.mongo.options;
    if (env.isProd) {
        logger.info("Configuring db in " + env.TAG + ' mode');
        dbUrl = dbUrl + dbName;
    } else {
        logger.info("Configuring db in " + env.TAG + ' mode');
        dbUrl = dbUrl + dbName;
        mongoose.set('debug', true);
    }

    logger.info("Connecting to -> " + dbUrl);
    mongoose.connect(dbUrl, dbOptions);

    // When successfully connected
    mongoose.connection.on('connected', function () {
        logger.info('Connected to DB', dbName, 'at', dbUrl);
        callback();
    });

    // If the connection throws an error
    mongoose.connection.on('error', function (error) {
        logger.info('DB connection error: ' + error);
        callback(error);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        logger.info('DB connection disconnected.');
        callback("DB connection disconnected.");
    });
    
    // project run admin create
    mongoose.connection.on('open', function () {
        const config = require("./index");

        let param={};
        param.email=config.cfg.adminEmail;
        param.password=appUtils.createHashSHA256(config.cfg.adminPassword);
        param.name=config.cfg.adminName;
        param.status=1;
        param.role = 1;
        adminService.adminRegister(param)
        .then(function (result) {
            console.log('admin =>>',result);
        });

    });
}

module.exports = connectDb;
