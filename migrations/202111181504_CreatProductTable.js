'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER, 
        autoIncrement: true
      },
      name: {
      	allowNull: false,
      	type: Sequelize.DataTypes.STRING
      },
      price: {
      	allowNull: false,
      	type: Sequelize.DataTypes.DECIMAL(10,2)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      }
      
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};