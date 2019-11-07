module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'username');
  },
};
