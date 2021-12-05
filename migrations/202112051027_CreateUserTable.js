'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER, 
        autoIncrement: true
      },
      fullname: {
      	allowNull: true,
      	type: Sequelize.DataTypes.STRING
      },
      phone: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      email: {
        allowNull: false,
        indicesType: 'UNIQUE',
        type: Sequelize.DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
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
    return queryInterface.dropTable('Users');
  }
};