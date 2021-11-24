'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Productreview', 
    'name', { type: Sequelize.DataTypes.STRING},
    'email',{type: Sequelize.DataTypes.STRING},
    'phone',{type: Sequelize.DataTypes.STRING}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Productreview', 
    'name', { type: Sequelize.DataTypes.STRING},
    'email',{type: Sequelize.DataTypes.STRING},
    'phone',{type: Sequelize.DataTypes.STRING}
    );
  }
};