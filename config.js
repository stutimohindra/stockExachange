var envName = process.env.NODE_ENV || "development"

var config = {
     dbConfig : {
             host: '127.0.0.1',
             port: '3306',
             user: 'root',
             password: 'root',
             database: 'companyDetails'
         }

}

const hostConfig={
    "development": 'http://localhost:3000',
    "production": ''
}
 module.exports = config;
