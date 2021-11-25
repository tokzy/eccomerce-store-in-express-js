'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cart = sequelize.define('Cart', {
    // Model attributes are defined here
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER, 
        autoIncrement: true
      },
      product_id: {
      	allowNull: false,
      	type: DataTypes.INTEGER
      },
      qty: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    user_id: {
        allowNull: true,
        type: DataTypes.INTEGER
    },
    guest_id: {
        allowNull: true,
        type: DataTypes.TEXT
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER
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
    tableName: "Cart"
});
  return Cart;
};