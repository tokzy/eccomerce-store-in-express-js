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
      category_id: {
      	allowNull: true,
      	type: Sequelize.DataTypes.INTEGER
      },
      brand_id: {
      	allowNull: true,
      	type: Sequelize.DataTypes.INTEGER
      },
      status: {
      	allowNull: false,
      	type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      },
      name: {
      	allowNull: false,
      	type: Sequelize.DataTypes.STRING
      },
      price: {
      	allowNull: false,
      	type: Sequelize.DataTypes.DECIMAL(10,2)
      },
      discount: {
      	allowNull:true,
      	type: Sequelize.DataTypes.DECIMAL(10,2)
      },
      cover_image: {
      	allowNull: false,
      	type: Sequelize.DataTypes.STRING
      },
      weight: {
      	allowNull:true,
      	type: Sequelize.DataTypes.DECIMAL(10,2)
      },
      descriptions: {
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
    return queryInterface.dropTable('Products');
  }
};