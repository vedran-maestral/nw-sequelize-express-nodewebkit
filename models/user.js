"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("UserData", {
    User: DataTypes.STRING,
    Password: DataTypes.STRING,
    Email: DataTypes.STRING,
    Name: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Picture: DataTypes.STRING
  });

  return User;
};