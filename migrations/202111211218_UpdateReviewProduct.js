'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Productreview', 
    'name2', { type: Sequelize.DataTypes.STRING}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Productreview', 
    'name2', { type: Sequelize.DataTypes.STRING}
    );
  }
};