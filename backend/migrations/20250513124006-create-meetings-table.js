export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Meetings', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    meeting_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    start: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    end: {
      type: Sequelize.DATE,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });

  await queryInterface.addColumn('Meetings', 'meeting_id', {
    type: Sequelize.STRING,
    allowNull: false,
  });
  await queryInterface.changeColumn('Meetings', 'meeting_id', {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  });
}

export async function down(queryInterface, _Sequelize) {
  _Sequelize;
  await queryInterface.dropTable('Meetings');
}
