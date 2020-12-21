const Sequelize = require('sequelize')

//Datos de conexion
const db = new Sequelize('app-node-2020', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    define: {
        timestamps: false,
    },
  });

module.exports = db
