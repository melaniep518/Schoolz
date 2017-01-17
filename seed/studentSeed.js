const Student = require('../models').Student;

Student.bulkCreate([
  {name:'Child1', age: 16, grade:11, SchoolId: 1},
  {name:'Child2', age:12 , grade:7, SchoolId: 1},
  {name:'Child3', age:13, grade:8, SchoolId: 2},
  {name:'Child4', age:15, grade:10, SchoolId: 2}
])

module.exports = Student;