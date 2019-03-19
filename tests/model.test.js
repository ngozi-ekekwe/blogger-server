const expect = require('chai').expect;
const db =  require('../server/models/index');
const helper = require('./helper');

describe('User Model', () => {
  let user;
  describe('User validation', () => {
    it('should create new user', (done) => {
      db.User.create(helper.user)
      .then((newUser) => {
        user = newUser;
        done();
      });
    });

    it('should be able to create a user', () => {
      expect(user).to.exist;
      expect(typeof user).to.equal('object');
    });

    it('user should have first Name', () => {
      expect(user).to.exist;
      expect(user).to.have.deep.property('firstName');
    });

    it('should create a user with first name & last name', () => {
      expect(user.firstName).to.equal(helper.user.firstName);
      expect(user.lastName).to.equal(helper.user.lastName);
    });

    it('should create a user with a valid email', () => {
      expect(user.email).to.equal(helper.user.email);
    });
  });
});

