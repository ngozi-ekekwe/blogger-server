const userController = require('./controller').userController;
const blogController = require('./controller').blogController;

const verifyToken = require('./middleware/auth').verifyToken

module.exports = (app) => {
  app.post('/api/v1/user', userController.create);
  app.post('/api/v1/login', userController.login);
  app.get('/api/v1/users', userController.list);
  app.get('/api/v1/users/:userId', userController.retrieve)

  app.get('/api/v1/stories', blogController.list);
  app.post('/api/v1/new-story', verifyToken, blogController.create);
  app.put('/api/v1/story/:userId/:slug', verifyToken,  blogController.update);
  app.delete('/api/v1/story/:userId/:slug', verifyToken, blogController.destroy);
  app.get('/api/v1/story/:slug', blogController.retrieve)
  app.get('/api/v1/stories/:userId', verifyToken, blogController.listMyBlogs)
}