'use strict';
module.exports = (sequelize, DataTypes) => {
  var Productreview = sequelize.define('Productreview', {
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
      review_text: {
      	allowNull: false,
      	type: DataTypes.TEXT
      },
      star_ratings: {
      	allowNull: true,
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
    tableName: "Productreview"
});
  return Productreview;
};