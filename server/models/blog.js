'use strict';
module.exports = (sequelize, DataTypes) => {
  var Blog = sequelize.define('Blog', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    slug: DataTypes.STRING
  }, {
  });
  Blog.associate = function(models) {
    // associations can be defined here
    Blog.belongsTo(models.User,  {
      foreignKey: 'userId',
      as: 'blogs',
      onDelete: 'CASCADE'
    })
  };
  return Blog;
};