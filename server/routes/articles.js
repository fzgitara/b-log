const express = require('express')
const router = express.Router()
const {getAll, getOne, create, update, getByAuthor, getByCategory, remove} = require('../controllers/articles')

router.get('/', getAll)
router.get('/:_id', getOne)
router.post('/', create)
router.put('/:_id', update)
router.get('/:author', getByAuthor)
router.get('/:category', getByCategory)
router.delete('/:_id', remove)

module.exports = router
