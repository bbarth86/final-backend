const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { decodeToken, generateToken } = require('../lib/token')

const excludeKeys = '-__v -password'

router.get('/profile', async (req, res, next) => {
  try {
    const payload = decodeToken(req.token)
    const user = await User.findOne({ _id: payload.id }).select(excludeKeys)

    const status = 200
    res.json({ status, user })
  } catch (e) {
    console.error(e)
    const error = new Error('You are not authorized to access this route.')
    error.status = 401
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      const valid = await bcrypt.compare(password, user.password)
      if (valid) {
        const status = 200
        const response = 'Authentication successful.'
        const token = generateToken(user._id)
        return res.status(status).json({ status, response, token })
      }
    } 
  } catch (e) {
      const message = `Email or password incorrect. Please check credentials and try again.`
      const error = Error(message)
      error.status = 401
      next(error)
  }
  
})

router.post('/signup', async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body
  const hashedRounds = 10
  const hashed = await bcrypt.hash(password, hashedRounds)

  const alreadyExists = await User.findOne({ email })
  if (alreadyExists) {
    const error = new Error(`Email '${email}' is already taken.`)
    error.status = 400

    return next(error)
  }

  const status = 201
  const user = await User.create({ email, firstName, lastName, password: hashed })
  const token = generateToken(user._id)
  res.status(status).json({ status, token })
})

module.exports = router