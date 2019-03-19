const faker = require('faker');

module.exports = {
  user: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    bio: 'my bio',
    password: 'password',
  },
};