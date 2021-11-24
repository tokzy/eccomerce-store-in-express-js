'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Productreview', 
    'email',{type: Sequelize.DataTypes.STRING}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Productreview', 
    'email',{type: Sequelize.DataTypes.STRING}
    );
  }
};