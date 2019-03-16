'use strict';

const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    
    email:{
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
    {
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
    }
);

  User.associate = function(models) {
    User.hasMany(models.Todo, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  }

  return User;
};