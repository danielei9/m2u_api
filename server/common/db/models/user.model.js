import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../../common/db/conn_db.js';

export default class User extends Model {}

User.init({
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});


// sequelize model:create --name usuario --attributes username:string,pswd:char,rol_id:integer,name:string,surname:string,email:string,phone:string,location:string,token:string