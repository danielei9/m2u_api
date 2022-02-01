import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../../db/conn_db.js';

export default class Role extends Model { }
Role.init({
  id: {
    type: sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: sequelize.STRING
  }
});