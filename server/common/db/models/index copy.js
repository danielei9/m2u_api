'use strict';
/*
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];*/
import * as fs from 'fs'
import * as path from 'path'
import  '../../common/db/conn_db.js';

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

db.ROLES = ["user", "admin", "moderator"];

//module.exports = db;
//db.sequelize = sequelize;

export {db}; 

/**
 * 
 * 'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

// Configuración
const config = require('../../config/database');

// Declaración de objeto DB
const db = {};

// Inicializar la conexión
const sequelize = new Sequelize(
  config.database,
  config.username,config.password,
  config);


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    
    // Cada modelo que hay en el directorio lo vinculamos a nuestro objeto DB
    db[model.name] = model;
  });

// Realizar las asociaciones de los modelos
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
 */