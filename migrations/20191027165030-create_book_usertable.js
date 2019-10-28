'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable( "userbooks",{      
      id:{ 
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement :true ,
        primaryKey:true
    },
    userId: Sequelize.INTEGER(100),    
    bookId: Sequelize.INTEGER(100),
    createdAt: Sequelize.DATE ,
    updatedAt: Sequelize.DATE 

  });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("userbooks");
  }
};
