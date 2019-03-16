const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET;

module.exports = {

  verifyToken(request, response, next) {
    const token = request.body.token ||
      request.headers.authorization ||
      request.headers['x-access-token'];
    if (token) {
      jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if (error) {
          response.status(401).send({
            message: 'Invalid token'
          });
        } else {
          request.decoded = decoded;
          next();
        }
      });
    } else {
      response.status(401).send({
        message: 'Token required to access this route'
      });
    }
  },

  
  generateToken(user) {
    return jwt.sign({
      UserId: user.dataValues.id,
    }, SECRET_KEY, { expiresIn: '2 days' });
  },

};

