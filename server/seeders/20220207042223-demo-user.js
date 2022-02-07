'use strict';
var bcrypt = require("bcryptjs");
// correr semillas npx sequelize-cli db:seed:all
// deshacer semillas npx sequelize-cli db:seed:undo

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert('Users', [{
      name: 'John',
      username: 'Doe',
      email: 'example@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      artist_name: "artist_name",
      phone: "432234234",
      email: "email@gmail.com",
      pswd: await bcrypt.hashSync("admin", 8).toString()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
