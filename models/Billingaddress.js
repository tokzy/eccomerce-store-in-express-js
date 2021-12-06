'use strict';
module.exports = (sequelize, DataTypes) => {
  var BillingAddress = sequelize.define('BillingAddress', {
    // Model attributes are defined here
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER, 
        autoIncrement: true
      },
      user_id: {
      	allowNull: false,
      	type: DataTypes.INTEGER,
        index: true  
      },
      state: {
        allowNull: true,
        type: DataTypes.STRING
      },
      city: {
        allowNull: true,
        type: DataTypes.STRING
      },
      zipcode: {
        allowNull: true,
        type: DataTypes.STRING
      },
      address: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      notes: {
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
    tableName: "BillingAddress"
});
  return BillingAddress;
};