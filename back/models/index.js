const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user')(sequelize, Sequelize)
db.Profile = require('./profile')(sequelize, Sequelize)
db.ProfileDetail = require('./profile_detail')(sequelize, Sequelize)
db.Project = require('./project')(sequelize, Sequelize)
db.ProjectDetail = require('./project_detail')(sequelize, Sequelize)
db.Tag = require('./tag')(sequelize, Sequelize)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
