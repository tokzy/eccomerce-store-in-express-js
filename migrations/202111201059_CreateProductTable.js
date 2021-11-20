'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Products', 
    'brand_id', { type: Sequelize.DataTypes.INTEGER }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Products', 
    'brand_id', { type: Sequelize.DataTypes.INTEGER }
    );
  }
};