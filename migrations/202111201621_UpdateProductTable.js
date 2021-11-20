'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Products', 
    'stock_status', { type: Sequelize.DataTypes.BOOLEAN,defaultValue: true }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Products', 
    'stock_status', { type: Sequelize.DataTypes.BOOLEAN,defaultValue: true }
    );
  }
};