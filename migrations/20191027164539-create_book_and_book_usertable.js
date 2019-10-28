'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable( "books",{      
        id:{ 
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement :true ,
            primaryKey:true
        },
        name: Sequelize.STRING(100),
        status:Sequelize.STRING(1),
        createdAt: Sequelize.DATE ,
        updatedAt: Sequelize.DATE 
    });    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("books");
  }
  
};
