module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'cellphone', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'cellphone');
  },
};
