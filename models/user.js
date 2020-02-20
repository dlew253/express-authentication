'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: {
      type:DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
          }
        }
      },
      name: {
        type:DataTypes.STRING,
        validate: {
          len: {
            args: [1,99],
            msg: "name miust be between 1 and 99 char"
            }
          }
        },
      password: {
        type : DataTypes.STRING,
        validate: {
          len: {
            args: [8, 99],
            msg: 'Password must be ebtween 8 and 99 char'
            }
          }
        }
  }, {
    hooks: {
      beforeCreate: function(createdUser, options, cb) {
        if (createdUser && createdUser.password){
        //hash pass
        let hash = bcrypt.hashSync(createdUser.password, 12);
        // store has as user pass
        createdUser.password = hash;
       }
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
  };
//compares password entered to hashed pass
  user.prototype.validPassword = function(passwordTyped) {
    return bcrypt.compareSync(passwordTyped, this.password);
  };
//buttfucks cinnamon remove pass before serializing
user.prototype.toJSON = function() {
  let userData = this.get();
  delete userData.password;
  return userData;
}


  return user;
};