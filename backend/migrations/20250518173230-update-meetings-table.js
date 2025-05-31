export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Meetings', 'meeting_id', {
    type: Sequelize.STRING,
    allowNull: false,
  });
  await queryInterface.addConstraint('Meetings', {
    type: 'unique',
    fields: ['meeting_id'],
  });
}
// eslint-disable-next-line no-unused-vars
export async function down(queryInterface, Sequelize) {}
