'use strict';

var envName = process.env.NODE_ENV || "development"

const dbConfig = {
    "development": {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'companyDetails'
    },
    "production": {
        host: 'zpj83vpaccjer3ah.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
        port: '3306',
        user: 'toxfbo310requ5zx',
        password: 'nwja3689ax6yvavm',
        database: 'lh09ujuuf7ehcrba'
    }
}

const hostConfig={
    "development": 'http://localhost:3000',
    "production": 'https://assignmentstockexch.herokuapp.com'
}

var config = {
    portHttp: process.env.PORT || 3000,
    portHttps: process.env.SPORT || 8443,
    offline_limit: 10,
    run_level: 1,
    timeout:60000,
    secret:"secret",
    db: [
        dbConfig[envName]
    ]
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

if (envName) {
    switch (envName) {
        case "development":
            config.run_level = 1;
            break;

    }
}
// config.run_level = 1;
module.exports = config;
