'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BillingAddress', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER, 
        autoIncrement: true
      },
      user_id: {
      	allowNull: false,
      	type: Sequelize.DataTypes.INTEGER,
        index: true  
      },
      state: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },
      city: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },
      zipcode: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },
      address: {
        allowNull: true,
        type: Sequelize.DataTypes.TEXT
      },
      notes: {
        allowNull: true,
        type: Sequelize.DataTypes.TEXT
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
    return queryInterface.dropTable('BillingAddress');
  }
};