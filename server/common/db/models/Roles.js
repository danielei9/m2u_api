import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../conn_db.js';
// sequelize model:create --name role.model --attributes username:string,pswd:char,rol_id:integer,name:string,surname:string,email:string,phone:string,location:string,token:string

export default class Role extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Role.belongsTo(models.Roles,
      {
        as: 'user',
        foreignKey: 'user_id',
      }
    );
  }
}
Role.init({
  role: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  modelName: 'Role',
  timestamps: false
});

(async () => {
  await sequelize.sync();
  const jane = await Role.create({
    role: 1
  });
  console.log(jane.toJSON());
})();
