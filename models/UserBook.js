const Sequelize = require('sequelize');

module.exports = sequelize.define("UserBook" ,{
    id:{ 
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement :true ,
        primaryKey:true
    },
    userId: Sequelize.INTEGER(100),    
    bookId: Sequelize.INTEGER(100)
});