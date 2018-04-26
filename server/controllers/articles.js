const Article = require('../models/articles')
const jwt = require('jsonwebtoken')

module.exports = {
  getOne (req, res) {
    Article.findOne({_id: req.params._id})
    .then(article => {
      res.status(200).json(article)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  },
  create (req, res) {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET)
    const article = new Article()
    article.title = req.body.title
    article.content = req.body.content
    article.category = req.body.category
    article.author = decoded._id
    article.save()
    .then(data => {
      res.status(201).json({
        message: 'New article created',
        data,
        token
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
  },
  update (req, res) {
    Article.findOne({_id: req.params._id})
    .then(data => {
      Article.update({_id: req.params._id}, {$set: req.body}, {upsert: true})
      .exec()
      .then(article => {
        res.status(201).json({
          message: 'Update success',
          article
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Article not found',
        error
      })
    })
  },
  getByAuthor (req, res) {
    Article.find({author: req.params.author})
    .then(articles => {
      res.status(200).json(articles)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  },
  getByCategory (req, res) {
    Article.find({category: req.params.category})
    .then(articles => {
      res.status(200).json(articles)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  },
  remove (req, res) {
    Article.remove({_id: req.params._id})
    .then(article => {
      res.status(200).json('Delete success')
    })
    .catch(err => {
      res.status(500).json({
        message: 'Article not found',
        err
      })
    })
  }
}