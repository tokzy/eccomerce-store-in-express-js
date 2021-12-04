'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('Users', {
    // Model attributes are defined here
  id: {
    allowNull: false,
    primaryKey: true,
    type:DataTypes.INTEGER, 
    autoIncrement: true
  },
   fullname: {
      allowNull: false,
      type:DataTypes.STRING
   },
   phone: {
      allowNull: false,
      type:DataTypes.STRING
   },
   email: {
    allowNull: false,
    type:DataTypes.STRING 
   },
   password: {
    allowNull: false,
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
    tableName: "Users"
});
  return User;
};