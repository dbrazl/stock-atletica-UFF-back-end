module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'thumbnail_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('products', 'thumbnail_id');
  },
};
