const School = require('../models').School;

School.bulkCreate([
  {name:'James Madison HighSchool', district: 22, size:3400},
  {name:'Edward R Murrow', district:21 , size:3855},
  {name:'Midwood', district:22, size:3989},
  {name:'Brooklyn Tech', district:13, size:5659}
])

module.exports = School;

