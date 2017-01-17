const router = require('express').Router();
const School = require('./models/index').School;
const Student = require('./models/index').Student;

function getSchools(req, res) {
  School.findAll()
  .then(function(schools) {
    res.send(schools);
  })
}

function postNewSchool(req, res) {
  School.create({
    name: req.body.name,
    district: req.body.district,
    size: req.body.size
  })
  .then(function(school) {
    school.dataValues.message = 'School successfully added!'
    res.send(school)
  })
}

function postNewStudent(req, res) {
  Student.create({
    name: req.body.name,
    age: req.body.age,
    grade: req.body.grade
  })
  .then(function(student) {
    console.log('STUDENT ===>', student);
    res.send({student: student, message: 'Student successfully added!'})
  })
}

function getOneSchoolWithStudents(req, res) {
  School.findOne({
    where: {
      id: req.params.id
    },
    include: [Student]
  })
  .then(function(school) {
    console.log('SCHOOL: ===>', school)
    res.send(school)
  })
}

router.route('/schools')
  .get(getSchools)
  .post(postNewSchool)

router.route('/student')
  .post(postNewStudent)

router.route('/schools/:id')
  .get(getOneSchoolWithStudents)

module.exports = router;