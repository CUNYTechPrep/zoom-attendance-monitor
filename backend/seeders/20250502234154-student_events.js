// eslint-disable-next-line no-unused-vars
export async function up(queryInterface, Sequelize) {
  queryInterface.bulkInsert(
    'StudentEvents',
    [
      {
        student_id: '123456789',
        meeting_id: '7543210987',
        event_action: 'JOINED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        student_id: '987654321',
        meeting_id: '6543210987',
        event_action: 'LEFT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        student_id: '456789123',
        meeting_id: '5432109876',
        event_action: 'JOINED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
}
// eslint-disable-next-line no-unused-vars
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   */
  await queryInterface.bulkDelete('StudentEvents', null, {});
}
