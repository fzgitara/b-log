const express = require('express')
const router = express.Router()
const {getOne, create, update, getByAuthor, getByCategory, remove} = require('../controllers/articles')

router.get('/:_id', getOne)

module.exports = router
