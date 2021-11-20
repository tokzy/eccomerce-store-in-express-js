'use strict';
module.exports = (sequelize, DataTypes) => {
  var Products = sequelize.define('Products', {
    // Model attributes are defined here
  id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER, 
        autoIncrement: true
      },
      category_id: {
      	allowNull: true,
      	type: DataTypes.INTEGER
      },
      status: {
      	allowNull: false,
      	type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      name: {
      	allowNull: false,
      	type: DataTypes.STRING
      },
      price: {
      	allowNull: false,
      	type: DataTypes.DECIMAL(10,2)
      },
      discount: {
      	allowNull:true,
      	type: DataTypes.DECIMAL(10,2)
      },
      cover_image: {
      	allowNull: false,
      	type: DataTypes.STRING
      },
      weight: {
      	allowNull:true,
      	type: DataTypes.DECIMAL(10,2)
      },
      descriptions: {
      	allowNull: true,
      	type: DataTypes.TEXT
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
      
},
  {
    freezeTableName: true,
    tableName: "Products"
});
  return Products;
};