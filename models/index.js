'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
require('dotenv').config();
const db = {};

let sequelize;
var dbName = process.env.DB_NAME,
    username = process.env.DB_USER,
    password = process.env.DB_PASS,
    host = process.env.DB_HOST

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);

}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Names = require('./name.model.js')(sequelize, Sequelize);
db.Friends = require('./friend.model.js')(sequelize, Sequelize);

db.Friends.belongsTo(db.Names,{
  foreignKey: "user_id",
  as: "user"
})
db.Friends.belongsTo(db.Names,{
  foreignKey: "friend_id",
  as: "friend"
})

module.exports = db;
