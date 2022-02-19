const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const db = require('../config/database')

const User = db.define('users', {
  // Model attributes are defined here
  UserID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false

  },
  UserName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  // freezeTableName: true
});

// User.sync({ force: true })
module.exports = User;
