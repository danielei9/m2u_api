import * as Sequelize from 'sequelize';
import l from '../logger.js';

const sequelize = new Sequelize.Sequelize('m2u', 'postgres', 'ER28-0652', {
  host: 'localhost',
  port: 5432,
  //dialect: 'mysql'|'sqlite'|'postgres'|'mssql',
  dialect:'postgres' //npm install pg
})

const authenticate = sequelize.authenticate()
.then(() => {
  console.log(l.info('Conectado DB'));
})
.catch(err => {
  console.error()
  console.log(l.error("No Conectado DB Error: " + err.original.routine));
})
export {sequelize}; 
