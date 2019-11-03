module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'personality', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'personality');
  },
};
