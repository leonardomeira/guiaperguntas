const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas', 'root', '562347', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection