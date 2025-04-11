export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Students', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    student_id: {
      allowNull: false,
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}

// eslint-disable-next-line no-unused-vars
export async function down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Students');
}