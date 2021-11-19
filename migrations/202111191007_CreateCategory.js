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
      	allowNull: true,
      	type: Sequelize.DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: DataTypes.NOW 
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: DataTypes.NOW 
      }
      
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};