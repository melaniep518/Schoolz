const School = require('../models').School;
const Student = require('../models').Student;

module.exports = function() {
  return School.bulkCreate([
    {name:'James Madison HighSchool', district: 22, size:3400},
    {name:'Edward R Murrow', district:21 , size:3855},
    {name:'Midwood', district:22, size:3989},
    {name:'Brooklyn Tech', district:13, size:5659}
  ])
  .then(function(schools) {
    return Student.bulkCreate([
      {name:'Child1', age: 16, grade:11, SchoolId: 1},
      {name:'Child2', age:12 , grade:7, SchoolId: 1},
      {name:'Child3', age:13, grade:8, SchoolId: 2},
      {name:'Child4', age:15, grade:10, SchoolId: 2}
    ])
  })
}