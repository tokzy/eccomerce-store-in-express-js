'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Productreview', {
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
      review_text: {
      	allowNull: false,
      	type: Sequelize.DataTypes.TEXT
      },
      star_ratings: {
      	allowNull: true,
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
    return queryInterface.dropTable('Productreview');
  }
};