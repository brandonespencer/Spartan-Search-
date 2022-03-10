const Sequelize = require('sequelize');
const db = require('../config/database');

const job = db.define('job', {
  title: {
    type: Sequelize.STRING
  },
  technologies: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  budget: {
    type: Sequelize.STRING
  },
  contact_email: {
    type: Sequelize.STRING
  }
});

Job.sync().then(() => {
  console.log('table created');
});
module.exports = Job;

