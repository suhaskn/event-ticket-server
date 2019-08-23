const Sequelize = require("sequelize");
const db = require("../db");
const Ticket = require("../tickets/model");

const Event = db.define("event", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  picture: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: true
  }
});

Ticket.belongsTo(Event)
Event.hasMany(Ticket)

module.exports = Event;