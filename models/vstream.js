"use strict";

module.exports = function(sequelize, DataTypes) {
  var ValueStream = sequelize.define("tbl_ValueStream", {
    ProductName: { type: DataTypes.STRING, allowNull: false, defaultValue: true},
    ComponentName: DataTypes.STRING,//simple setup, does not allow nulls
    SpecificComponentName: DataTypes.STRING,
    ShortName: { type: DataTypes.STRING, allowNull: false, defaultValue: true},
    Picture: {type: DataTypes.STRING, allowNull: true},
    Description: {type: DataTypes.STRING, allowNull: true}
  },{
    // don't add the timestamp attributes (updatedAt, createdAt)
    //timestamps: false,

    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
   // paranoid: true,

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
   // underscored: true,

    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    //freezeTableName: true,

    // define the table's name
    //tableName: 'my_very_custom_table_name'
  });

  return ValueStream;
};