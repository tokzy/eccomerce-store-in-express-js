'use strict';
module.exports = (sequelize, DataTypes) => {
  var Products = sequelize.define('Products', {
    // Model attributes are defined here
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
      
},
  {
    freezeTableName: true,
    tableName: "Products"
});
  return Products;
};