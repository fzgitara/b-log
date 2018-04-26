const User = require('../models/users')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken')

module.exports = {
  register (req, res) {
    const hash = bcrypt.hashSync(req.body.password, salt)
    const user = new User()
    user.username = req.body.username
    user.password = hash
    const token = jwt.sign({_id: user._id, username: user.username}, process.env.SECRET)
    user.save()
    .then(data => {
      res.status(201).json({
        message: 'Register success',
        data,
        token
      })
    })
  },
  login (req, res) {
    User.findOne({username: req.body.username})
    .exec()
    .then(user => {
      if(user){
        const check = bcrypt.compareSync(req.body.password, user.password)
        const token = jwt.sign({_id: user._id, username: user.username}, process.env.SECRET)
        if(check){
          res.status(200).json({
            message: 'Login success',
            user,
            token
          })
        } else {
          res.status(409).json('Wrong password')
        }
      } else {
        res.status(409).json('Username not found')
      }
    })
  }
}