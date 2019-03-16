const db = require('../models');


module.exports = {
  create(req, res) {
    db.Blog
      .create({
        title: req.body.title,
        userId: req.body.userId,
        content: req.body.content,
        slug: `${(req.body.title).replace(/ /g, '-').toLowerCase()}-${Date.now()}`
      })
      .then((blog) => {
        res.status(201).send({
          message: blog
        })
      })
      .catch((err) => {
        res.status(401).send({
          message: err
        })
      })
  },

  list(req, res) {
    return db.Blog
      .findAll()
      .then((blogs) => {
        res.status(201).send({
          data: blogs
        })
      })
      .catch((err) => {
        res.status(401).send(err);
      })
  },

  update(req, res) {
    return db.Blog
      .findOne({
        where: {
          slug: req.params.slug,
          userId: req.params.userId
        }
      })
      .then((blog) => {
        if (!blog) {
          return res.status(404).send({
            message: "Blog not found"
          })
        }
        
        blog.update(req.body).then((blog) => {
            return res.status(201).send(blog)
          })
          .catch((err) => {
            res.status(401).send(err)
          })
      })
      .catch((err) => {
        res.status(401).send({
          err
        })
      })
  },

  destroy(req, res) {
    return db.Blog
      .findOne({
        where: {
          slug: req.params.slug,
          userId: req.params.userId
        }
      })
      .then((blog) => {
        if (!blog) {
          return res.status(404).send({
            message: "Blog not found"
          })
        }
        return blog
          .destroy()
          .then(() => {
            return res.status(201).send({
              message: "Blog deleted"
            })
          })
          .catch((err) => {
            res.status(401).send(err)
          })
      })
  },


  retrieve(req, res) {
    return db.Blog
      .findAll({
        where: {
          slug: req.params.slug
        }
      })
      .then((blog) => {
        if (!blog) {
          return res.status(404).send({
            message: "Blog not found"
          })
        }

        return res.status(201).send({
          blog
        })
      })
      .catch((err) => {
        res.status(401).send(err)
      });
  },

  listMyBlogs(req, res) {
    db.Blog.findAll({ where: { userId: req.params.userId } })
      .then(docs => {
        console.log(docs)
        return res.status(200).send(docs)
      });
  },
}