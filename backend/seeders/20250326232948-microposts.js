'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line no-unused-vars
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
    await queryInterface.bulkInsert('MicroPosts', [
      {
        content: 'First Post',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Second Post',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Third Post',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('MicroPosts', null, {});
  },
};
