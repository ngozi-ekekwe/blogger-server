const userController = require('./controller').userController;
const blogController = require('./controller').blogController;

const verifyToken = require('./middleware/auth').verifyToken

module.exports = (app) => {
  app.post('/api/user', userController.create);
  app.post('/api/login', userController.login);
  app.get('/ap/users', userController.list);
  app.get('/api/users/:userId', userController.retrieve)

  app.get('/api/stories', blogController.list);
  app.post('/api/new-story', verifyToken, blogController.create);
  app.put('/api/story/:userId/:slug', verifyToken,  blogController.update);
  app.delete('/api/story/:userId/:slug', verifyToken, blogController.destroy);
  app.get('/api/story/:slug', blogController.retrieve)
  app.get('/api/stories/:userId', verifyToken, blogController.listMyBlogs)
}