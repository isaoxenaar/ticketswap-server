const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../user/model");

const Event = db.define("event", {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  pictureurl: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  enddate: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER
  }
});

Event.belongsTo(User);
User.hasMany(Event);

module.exports = Event;
