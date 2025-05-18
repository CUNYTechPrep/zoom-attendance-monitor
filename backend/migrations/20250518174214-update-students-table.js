export async function up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Students', 'student_id', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  }
// eslint-disable-next-line no-unused-vars
export async function down(queryInterface, Sequelize) {}