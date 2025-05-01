export default async () => {
    const { sequelize } = await import('./models/index.js');
    await sequelize.sync({ force: true });
};  