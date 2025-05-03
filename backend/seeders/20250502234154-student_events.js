// eslint-disable-next-line no-unused-vars
export async function up(queryInterface, Sequelize) {
  queryInterface.bulkInsert(
    'StudentEvents',
    [
      {
        id: 1,
        student_id: 'S12345',
        meeting_id: 'M001',
        event_action: 'joined',
        createdAt: new Date('2025-04-20T08:00:00'),
        updatedAt: new Date('2025-04-20T08:00:00'),
      },
      {
        id: 2,
        student_id: 'S67890',
        meeting_id: 'M002',
        event_action: 'left',
        createdAt: new Date('2025-04-20T08:00:00'),
        updatedAt: new Date('2025-04-20T08:00:00'),
      },
      {
        id: 3,
        student_id: 'S11223',
        meeting_id: 'M003',
        event_action: 'joined',
        createdAt: new Date('2025-04-20T08:00:00'),
        updatedAt: new Date('2025-04-20T08:00:00'),
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
