const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Job = require('../models/job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get job list
router.get('/', (req, res) => 
  Gig.findAll()
    .then(gigs => res.render('jobs', {
        gigs
      }))
    .catch(err => res.render('error', {error: err})));

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

// Add a gig
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  // Validate Fields
  if(!title) {
    errors.push({ text: 'Please add a title' });
  }
  if(!technologies) {
    errors.push({ text: 'Please add some technologies' });
  }
  if(!description) {
    errors.push({ text: 'Please add a description' });
  }
  if(!contact_email) {
    errors.push({ text: 'Please add a contact email' });
  }

  // Check for errors
  if(errors.length > 0) {
    res.render('add', {
      errors,
      title, 
      technologies, 
      budget, 
      description, 
      contact_email
    });
  } else {
    if(!budget) {
      salary = 'Unknown';
    } else {
      salary = `$${salary}`;
    }

    // Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/,[ ]+/g, ',');

    // Insert into table
    job.create({
      title,
      technologies,
      description,
      budget,
      contact_email
    })
      .then(job => res.redirect('/jobs'))
      .catch(err => res.render('error', {error:err.message}))
  }
});

// Search for jobs
router.get('/search', (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  job.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
    .then(jobs => res.render('jobs', { jobs }))
    .catch(err => res.render('error', {error: err}));
});

module.exports = router;
