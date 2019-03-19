const chai = require('chai');
const supertest = require('supertest');
const app = require('../server');
const db = require('../server/models')

const request = supertest(app);
const expect = chai.expect;


describe('User Api', () => {
  before(() => {
    db.User.create({ email: "test@gmail.com", password: "password" })
      .then((newUser) => {
        db.Blog.create({
          title: "complete checkpoint",
          content: "true",
          userId: newUser.id,
          slug: 'slug'
        }).then((blog) => {
        })
      })
  });

  after(() => db.sequelize.sync({ force: true }));

  describe('User create endpoint', () => {
    it('POST /api/user should create a user', (done) => {
      request
        .post('/api/v1/user')
        .send({
          email: "test2@gmail.com",
          password: "password"
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('User successfully created');
          expect(res.body.userId).to.be.a('number')
          expect(res.status).to.equal(201);
          done();
        })
    });
  });

  describe('Log in User', () => {
    it('should log a user in', (done) => {
      request
        .post('/api/v1/login')
        .send({
          email: "test2@gmail.com",
          password: "password"
        })
        .end((err, res) => {
          expect(res.body.userIdentity).to.be.a('number');
          expect(res.body.expiresIn).to.equal('2 days');
          expect(res.status).to.equal(200);
          done();
        })
    })
  })
})