export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('MicroPosts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [3, 250],
        notEmpty: true,
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}

// eslint-disable-next-line no-unused-vars
export async function down(queryInterface, _Sequelize) {
  await queryInterface.dropTable('MicroPosts');
}
