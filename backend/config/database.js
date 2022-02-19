const { Sequelize } = require('sequelize');
const env = process.env;


module.exports = new Sequelize(
    env.DB_DATABASE,
    env.DB_USERNAME,
    env.DB_PASSWORD, {
    host: 'localhost',
    dialect: "mysql",
    logging: false,
   
});