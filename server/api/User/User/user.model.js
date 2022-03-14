'use strict';
//sequelize model:generate --name role.model --attributes name:string
var bcrypt = require("bcryptjs");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.order, {
        foreignKey: {
          // name: 'uid',
          allowNull: false
        }
      });
      User.hasMany(models.artist);
      User.hasMany(models.comment   );
     /* User.hasMany(models.review, {
        foreignKey: {
          allowNull: false
        }
      }); LO RECOGE DEL ORDER */
      User.hasMany(models.faq);
      User.hasMany(models.blog, {
        foreignKey: {
          // name: 'uid',
          allowNull: false
        }
      });
      User.belongsToMany(models.song, {
        through: "reproductions",
        foreignKey: "userId",
        otherKey: "songId"
      });

      /*  User.belongsToMany(models.playlist, {
          through: "follower_lista",
          foreignKey: "userId",
          otherKey: "playlistId"
        });
        */
      User.belongsToMany(models.song, {
        through: "playlist_user",
        foreignKey: "userId",
        otherKey: "playlistId"
      });
      User.belongsToMany(models.song, {
        through: "like_song",
        foreignKey: "userId",
        otherKey: "songId"
      });
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      get() {
        const username = this.getDataValue('username');
        return username;
      }
    }, 
    jwt: {
      type: DataTypes.TEXT,
      get() {
        const jwt = this.getDataValue('jwt');
        return jwt;
      }
    },
    surname: {
      type: DataTypes.STRING,
      get() {
        const surname = this.getDataValue('surname');
        return surname;
      }
    },
    phone: {
      type: DataTypes.STRING,
      get() {
        const phone = this.getDataValue('phone');
        return phone;
      },
      set(value) {
        this.setDataValue('phone', value);
      },
    },
    email: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('email', value);
      },
      get() {
        const email = this.getDataValue('email');
        return email;
      }
    },
    pswd: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('pswd', bcrypt.hashSync(value, 8).toString());
      },
      get() {
        const pswd = this.getDataValue('pswd');
        return pswd;
      }
    },
    postalCode: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('postalCode', value);
      },
      get() {
        const postalCode = this.getDataValue('postalCode');
        return postalCode;
      }
    },
    name: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('name', value);
      },
      get() {
        const name = this.getDataValue('name');
        return name;
      }
    },
    street: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('street', value);
      },
      get() {
        const street = this.getDataValue('street');
        return street;
      }
    },
    locality: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('locality', value);
      },
      get() {
        const locality = this.getDataValue('locality');
        return locality;
      }
    },
    country: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('country', value);
      },
      get() {
        const country = this.getDataValue('country');
        return country;
      }
    },
  }, {
    sequelize,
    freezeTableName: true,
  });


  return User;
};
