'use strict';
module.exports = (sequelize, DataTypes) => {
  var Todo = sequelize.define('Todo', {
    title: {
     type: DataTypes.STRING,
     allowNull: false
    },

    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    dayMarkedForCompletion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    }
  });
  Todo.associate = (models) => {
    Todo.belongsTo(models.User,  {
      foreignKey: 'userId',
      as: 'todos',
      onDelete: 'CASCADE'
    })
  };
  return Todo;
};