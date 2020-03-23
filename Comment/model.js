const Sequelize = require("sequelize");
const db = require("../db");
const Ticket = require("../Ticket/model");
const User = require("../user/model");
const Event = require("../Event/model");

const Comment = db.define("comment", {
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  ticketId: {
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER
  },
  eventId: {
    type: Sequelize.INTEGER
  }
});

Comment.belongsTo(Ticket);
Ticket.hasMany(Comment);

Comment.belongsTo(User);
User.hasMany(Comment);

Comment.belongsTo(Event);
Event.hasMany(Comment);

module.exports = Comment;
