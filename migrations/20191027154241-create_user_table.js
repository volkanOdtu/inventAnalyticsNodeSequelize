'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable( "users",{
    id:{ 
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement :true ,
      primaryKey:true
  },
  name: Sequelize.STRING(100),
  createdAt: Sequelize.DATE ,
  updatedAt: Sequelize.DATE 
   });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
