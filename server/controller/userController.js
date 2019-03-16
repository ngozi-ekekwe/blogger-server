const db = require('../models');
const authentication = require('../middleware/auth');
const jwt = require('jsonwebtoken');

const secret = "secret"

module.exports = {
  create(req, res) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
      email: req.body.email,
      password: req.body.password
    })
      .then((newUser) => {
        res.status(201).send({
          message: 'User successfully created',
          token: authentication.generateToken(newUser),
          userId: newUser.id
        });
      })
      .catch((err) => {
        res.status(401).send(err)
      })
  },

  login(req, res) {
    db.User.findOne({ where: { email: req.body.email, password: req.body.password } })
      .then((user) => {
        if (user) {
          const token = jwt.sign({
            UserId: user.id,
          }, secret, {
              expiresIn: '2 days'
            });
          return res.status(200).send({
            userIdentity: user.id,
            token,
            expiresIn: '2 days',
          });
        }
        return res.status(401).send({
          message: 'failed to authenticate user'
        });
      });
  },
}