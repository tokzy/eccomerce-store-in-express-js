const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Category extends Model {}

Category.init({
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
  
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Category', // We need to choose the model name
  freezeTableName: true,
  tableName: 'Category'
});