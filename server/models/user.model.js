module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    surname: {
      type: Sequelize.STRING
    },
    artist_name: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    pswd: {
      type: Sequelize.STRING
    }
  });

  return User;
};
