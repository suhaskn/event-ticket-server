const Sequelize = require("sequelize");
const db = require("../db");

const Ticket = db.define("ticket", {
  ticketPicture: {
    type: Sequelize.STRING,
    allowNull: true
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = Ticket;