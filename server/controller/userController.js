const db = require('../models');
const authentication = require('../middleware/auth');
const jwt = require('jsonwebtoken');

const bcrypt =  require('bcrypt-nodejs');
const secret = process.env.SECRET;


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
        res.status(401).send({err: err.message})
      })
  },

  list(req, res) {
    return db.User
      .findAll()
      .then((users) => {
        res.status(201).send({
          data: users
        })
      })
      .catch((err) => {
        res.status(401).send(err);
      })
  },

  retrieve(req, res) {
    return db.User
      .findAll({
        where: {
          id: req.params.userId
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "user not found"
          })
        }

        return res.status(201).send({
          user
        })
      })
      .catch((err) => {
        res.status(401).send(err)
      });
  },

  login(req, res) {
    db.User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: 'failed to authenticate user' });
        }

        if(bcrypt.compareSync(req.body.password, user.password)) {
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
        else {
          return res.status(404).send({
            message: 'Incorrect password'
          });
        }
      }).catch((err) => {
        res.status(400).send(err.errors);
      });
  },
}