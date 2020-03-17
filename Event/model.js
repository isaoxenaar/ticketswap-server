const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../user/model");

const Event = db.define("event", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  pictureurl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  enddate: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// Event.belongsTo(User);
// User.hasMany(Event);

module.exports = Event;
