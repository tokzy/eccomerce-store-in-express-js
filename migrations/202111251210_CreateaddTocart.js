'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cart', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER, 
        autoIncrement: true
      },
      product_id: {
      	allowNull: false,
      	type: Sequelize.DataTypes.INTEGER
      },
      qty: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    user_id: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER
    },
    guest_id: {
        allowNull: true,
        type: Sequelize.DataTypes.TEXT
    },
    price: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
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
    return queryInterface.dropTable('Cart');
  }
};