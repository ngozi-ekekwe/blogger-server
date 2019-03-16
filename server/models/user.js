'use strict';
const bcrypt = require('bcrypt-nodejs');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.TEXT,
    password: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate: (user, options) => {
         user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
         return user;
      }
    },

    instanceMethods: {
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Blog, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};