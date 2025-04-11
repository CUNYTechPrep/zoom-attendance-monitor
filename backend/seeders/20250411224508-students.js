'use strict';

/** @type {import('sequelize-cli').Migration} */
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

    await queryInterface.bulkInsert(
      'Students',
      [
        {
          name: 'John Doe',
          email: 'johndoe@example.com',
          student_id: '123456789',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Jane Doe',
          email: 'janedoe@example.com',
          student_id: '987654321',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Alice Smith',
          email: 'alices@example.com',
          student_id: '456789123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Students', null, {});
  },
};
