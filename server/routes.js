const userController = require('./controller').userController;

module.exports = (app) => {
  app.post('/api/user', userController.create);
  app.post('/api/login', userController.login);
}