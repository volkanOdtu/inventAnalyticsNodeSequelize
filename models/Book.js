const Sequelize = require('sequelize');

module.exports = sequelize.define("Book" ,{
    id:{ 
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement :true ,
        primaryKey:true
    },
    name: Sequelize.STRING(100),
    status:Sequelize.STRING(1)
});