'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Productreview', 
    'phone',{type: Sequelize.DataTypes.STRING}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Productreview', 
    'phone',{type: Sequelize.DataTypes.STRING}
    );
  }
};