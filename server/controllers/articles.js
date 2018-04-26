const Article = require('../models/articles')
const jwt = require('jsonwebtoken')
const {getPublicUrl} = require('../middlewares/uploadGCS')

module.exports = {
  getAll (req, res) {
    Article.find()
    .populate('author')
    .then(articles => {
      res.status(200).json(articles)
    })
  },
  getOne (req, res) {
    Article.findOne({_id: req.params._id})
    .populate('author')
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
    article.author = decoded._id,
    article.img = req.file.cloudStoragePublicUrl
    article.save()
    .then(data => {
      res.status(201).json({
        message: 'New article created',
        data
      })
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
    Article.find({author: req.params.authorId})
    .exec()
    .then(articles => {
      res.status(200).json(articles)
    })
  },
  getByCategory (req, res) {
    Article.find({category: req.params.category})
    .exec()
    .then(articles => {
      res.status(200).json(articles)
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