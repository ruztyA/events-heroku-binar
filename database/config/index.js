const Sequelize = require('sequelize');

const User = require('../models/user');
const Event = require('../models/event');

const { DataTypes } = Sequelize;

const sequelizeInstance = new Sequelize(
  'd6vpdkcbjmekfb', // ! nama dabatabase
  'mcqzprlzvgstck', // ! username
  'b6800999cb691fbfc2ce286fb8353cf663185f46b3517e11898c0b10e706be55', { // ! password
  host: 'ec2-52-0-114-209.compute-1.amazonaws.com',
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
  }
});

sequelizeInstance.authenticate()
.then((res) => console.log('Connection has been established successfully. ', res))
.catch((error) => console.error('Unable to connect to the database:', error))


const userModel = User(sequelizeInstance, DataTypes)
const eventModel = Event(sequelizeInstance, DataTypes)

module.exports = {
  userModel,
  eventModel
};


