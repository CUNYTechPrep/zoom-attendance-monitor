// eslint-disable-next-line no-unused-vars
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
    'Meetings',
    [
      {
        meeting_id: '7543210987',
        meeting_name: 'Team Sync',
        start: new Date('2025-04-25T09:00:00'),
        end: new Date('2025-04-25T10:00:00'),
        createdAt: new Date('2025-04-20T08:00:00'),
        updatedAt: new Date('2025-04-20T08:00:00'),
      },

      {
        meeting_name: 'Project Kickoff',
        meeting_id: '6543210987',
        start: new Date('2025-04-26T14:00:00'),
        end: new Date('2025-04-26T15:00:00'),
        createdAt: new Date('2025-04-21T08:00:00'),
        updatedAt: new Date('2025-04-21T08:00:00'),
      },

      {
        meeting_name: 'Client Presentation',
        meeting_id: '5432109876',
        start: new Date('2025-04-27T11:00:00'),
        end: new Date('2025-04-27T12:00:00'),
        createdAt: new Date('2025-04-22T08:00:00'),
        updatedAt: new Date('2025-04-22T08:00:00'),
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
  await queryInterface.bulkDelete('Meetings', null, {});
}
