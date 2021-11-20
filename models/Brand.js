'use strict';
module.exports = (sequelize, DataTypes) => {
  var Brand = sequelize.define('Brands', {
    // Model attributes are defined here
  id: {
    allowNull: false,
    primaryKey: true,
    type:DataTypes.INTEGER, 
    autoIncrement: true
  },
  name: {
      allowNull: true,
      type:DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type:DataTypes.DATE,
    defaultValue: DataTypes.NOW

  },
  updatedAt: {
    allowNull: false,
    type:DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
},
  {
    freezeTableName: true,
    tableName: "Brands"
});
  return Brand;
};