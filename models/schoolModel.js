"use strict";

module.exports = function(sequelize, DataTypes) {
  var School = sequelize.define("School", {
    name: {
      type: DataTypes.STRING
    },
    district: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        School.hasMany(models.Student);
      }
    }
  });

  return School;
}