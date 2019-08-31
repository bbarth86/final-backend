const { CLIENT_BASE_URL, NODE_ENV, PORT } = process.env;
const express = require('express');

const authRoutes = require('./api/routes/authenticate');
const userRoutes = require('./api/routes/users');
const assignmentRoutes = require('./api/routes/assignments');

// Init App
const app = express()

// Database Connection
require('./db/connection')()

// Application-level Middleware
if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

// Attach token to request
app.use(require('./api/middleware/set-token'))

// CORS Access
app.use(require('cors')({
  origin: CLIENT_BASE_URL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))


// Routes
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users/:userId/assignments', assignmentRoutes);

// Not Found Handler
app.use((req, res, next) => {
  const error = new Error(`Could not ${req.method} ${req.path}`)
  error.status = 404
  next(error)
})


// Error Handler
app.use((err, req, res, next) => {
  if (NODE_ENV === 'development') console.error(err)
  const { message, status } = err
  res.status(status).json({ status, message })
})

// Open Connection
const listener = () => console.log(`Listening on Port ${PORT}!`)
app.listen(PORT, listener)
