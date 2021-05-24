const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas', 'root', 'insirasenha', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection
