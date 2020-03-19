const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../user/model");
const Event = require("../Event/model");

const Ticket = db.define("ticket", {
  logo: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false
  },
  eventId: {
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER
  }
});

Ticket.belongsTo(Event);
Event.hasMany(Ticket);

Ticket.belongsTo(User);
User.hasMany(Ticket);

module.exports = Ticket;
