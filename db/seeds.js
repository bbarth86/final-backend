const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('../nodemon.json')
const User = require('../api/models/user')

const reset = async () => {
  mongoose.connect(config.env.MONGO_DB_CONNECTION, { useNewUrlParser: true })
  // Careful with .remove() -- it sends a command directly to the database
  // and skips any mongoose validations
  await User.deleteMany() // Deletes all records
  return User.create([
    {
      firstName: 'Student',
      lastName: 'User',
      email: 'student@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false,
      assignments: [
        {
          title: 'Final Project',
          url: 'http://www.google.com',
          description: 'Maximum stress',
          score_earned: 40,
          score_total: 50
        }
      ]
    },
    {
      firstName: 'Student',
      lastName: 'User2',
      email: 'student2@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false,
      assignments: [
        {
          title: 'Final Project',
          url: 'http://www.google.com',
          description: 'Maximum stress',
          score_earned: 40,
          score_total: 50
        }
      ]
    },
    {
      firstName: 'Student',
      lastName: 'User3',
      email: 'student3@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false,
      assignments: [
        {
          title: 'Final Project',
          url: 'http://www.google.com',
          description: 'Maximum stress',
          score_earned: 40,
          score_total: 50
        }
      ]
    },
    {
      firstName: 'Student',
      lastName: 'User4',
      email: 'student4@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false,
      assignments: [
        {
          title: 'Final Project',
          url: 'http://www.google.com',
          description: 'Maximum stress',
          score_earned: 40,
          score_total: 50
        }
      ]
    },
    {
      firstName: 'Student',
      lastName: 'User5',
      email: 'student5@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false,
      assignments: [
        {
          title: 'Final Project',
          url: 'http://www.google.com',
          description: 'Maximum stress',
          score_earned: 40,
          score_total: 50
        }
      ]
    },
    {
      firstName: 'Student',
      lastName: 'User6',
      email: 'student6@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false,
      assignments: [
        {
          title: 'Final Project',
          url: 'http://www.google.com',
          description: 'Maximum stress',
          score_earned: 40,
          score_total: 50
        }
      ]
    },
    {
      firstName: 'Student',
      lastName: 'User7',
      email: 'student7@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false,
      assignments: [
        {
          title: 'Final Project',
          url: 'http://www.google.com',
          description: 'Maximum stress',
          score_earned: 40,
          score_total: 50
        }
      ]
    },
    {
      firstName: 'Student',
      lastName: 'User8',
      email: 'student8@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false,
      assignments: [
        {
          title: 'Final Project',
          url: 'http://www.google.com',
          description: 'Maximum stress',
          score_earned: 40,
          score_total: 50
        }
      ]
    },
    {
      firstName: 'Student',
      lastName: 'User9',
      email: 'student9@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false,
      assignments: [
        {
          title: 'Final Project',
          url: 'http://www.google.com',
          description: 'Maximum stress',
          score_earned: 40,
          score_total: 50
        }
      ]
    },
    {
      firstName: 'Student',
      lastName: 'User10',
      email: 'student10@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false,
      assignments: [
        {
          title: 'Final Project',
          url: 'http://www.google.com',
          description: 'Maximum stress',
          score_earned: 40,
          score_total: 50
        }
      ]
    },
    {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: true,
      assignments: [
        {
          title: 'Final Project',
          url: 'http://www.google.com',
          description: 'Maximum stress',
          score_earned: 50,
          score_total: 50
        }
      ]
    }
  ])
}

reset().catch(console.error).then((response) => {
  console.log(`Seeds successful! ${response.length} records created.`)
  return mongoose.disconnect()
})
