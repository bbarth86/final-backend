const router = require('express').Router({ mergeParams: true })
const User = require('../models/user')
const Assignment = require('../models/assignment');
const { isLoggedIn, isSameUser } = require('../middleware/auth')

router.post('/', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 201

  const { userId } = req.params
  const query = { _id: userId }
  const user = await User.findOne(query)
  
  user.assignments.push(req.body)
  await user.save()
  
  const assignment = user.assignments[user.assignments.length - 1]
  res.status(status).json({ status, response: assignment })
})

router.put('/:assignmentId', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200

  const { assignmentId, userId } = req.params
  const query = { _id: userId }
  const user = await User.findOne(query)
  const assignment = user.assignments.id(assignmentId)
  
  const { title, description, url } = req.body
  assignment.title = title;
  assignment.description = description;
  assignment.url = url;
  await user.save()
  
  res.status(status).json({ status, response: assignment })
})

router.delete('/:assignmentId', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200

  const { assignmentId, userId } = req.params
  const query = { _id: userId }
  const user = await User.findOne(query)

  user.assignments = user.assignments.filter(assignment => assignment.id !== assignmentId)
  await user.save()

  res.json({ status, response: user })
})

module.exports = router