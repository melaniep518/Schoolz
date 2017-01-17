process.env.NODE_ENV = 'test';

let models = require('./models/index')
let Student = models.Student;
let School = models.School;

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./server.js');
let should = chai.should();

//write a function to seed your database before every test inside of the seed folder
//your seed function should create 4 schools
//your seed function should create 2 students that attend the first school
let seedFunction = require('./seed/index')


chai.use(chaiHttp);
//Our parent block
describe('Education', () => {
    beforeEach((done) => { //Before each test we empty the database
      models.sequelize.sync({force: true}).then(function() {
        seedFunction()
        done();
      })
    });
/*
  * Test the /GET route
  */
  describe('/GET schools', () => {
      it('it should GET all the schools', (done) => {
        chai.request(server)
            .get('/api/schools')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(4);
              done();
            });
      });
  });

  describe('/POST school', () => {
      it('it should POST a school ', (done) => {
// let school = school[1] was incorrect; we have to define school
// this test is asking us to create a school object and pass into the AJAX request the school variable we just created
        let school = {name: "New School", district: "New district", size: 1000}
        chai.request(server)
            .post('/api/schools')
            .send(school)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
// in the AJAX POST request we can append a message property to school.dataValues to add a message property to res.body
                res.body.should.have.property('message').eql('School successfully added!');
                res.body.should.have.property('name');
                res.body.should.have.property('district');
                res.body.should.have.property('size');
              done();
            });
      });
  });

  describe('/POST student', () => {
      it('it should POST a student ', (done) => {
        let student = {name: 'New Student', age: 14, grade: 9, SchoolId: 3}
        chai.request(server)
            .post('/api/student')
            .send(student)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Student successfully added!');
                res.body.student.should.have.property('name');
                res.body.student.should.have.property('age');
                res.body.student.should.have.property('grade');
              done();
            });
      });
  });

  describe('/GET school', () => {
      it('it should GET a single school along with all its students', (done) => {
        chai.request(server)
            .get('/api/schools/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('district');
                res.body.should.have.property('size');
                res.body.Students.should.be.a('array');
                res.body.Students.length.should.be.eql(2);
              done();
            });
      });
  });

});
