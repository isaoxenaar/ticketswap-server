const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../user/model");
const Ticket = require("../Ticket/model");

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
  }
});

Comment.belongsTo(Ticket);
Ticket.hasMany(Comment);

Comment.belongsTo(User);
User.hasMany(Comment);

module.exports = Comment;
