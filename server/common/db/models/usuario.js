'use strict';
import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../conn_db.js';
// sequelize model:create --name usuario --attributes username:string,pswd:char,rol_id:integer,name:string,surname:string,email:string,phone:string,location:string,token:string

export default class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    User.hasOne(models.Roles,
      {
          as: 'role',
          foreignKey: 'user_id'
      }
  );
  }
}
User.init({
  /*Si se cambia actualizar la migracion */
  username: DataTypes.STRING,
  pswd: DataTypes.CHAR,
  rol_id: DataTypes.INTEGER,
  name: DataTypes.STRING,
  surname: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  location: DataTypes.STRING,
  token: DataTypes.STRING
}, {
  sequelize,
  modelName: 'User',
});
(async () => {
  await sequelize.sync();
  const jane = await User.create({
    username: "user",
    pswd: "pswd",
    rol_id: 1,
    name: "name",
    surname: "surname",
    email: "email",
    phone: "1312123",
    location: "vlc",
    token: "pswd"
  });
  console.log(jane.toJSON());
})();