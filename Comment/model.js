const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../user/model");
const Ticket = require("../Ticket/model");

const Comment = db.define("comment", {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ticketId: {
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER
  },
  ticketId: {
    type: Sequelize.INTEGER
  }
});

Comment.belongsTo(Ticket);
Ticket.hasMany(Event);

Comment.belongsTo(User);
User.hasMany(Comment);

module.exports = Ticket;
