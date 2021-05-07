const bcrypt = require('bcrypt')
let User = require('../models/user')
const generateToken = require('../utils/auth/jwt')
const sendConfirmationMail = require('../utils/mail/sendEmail')

async function routes (fastify, options) {
    fastify.post('/api/signup', async (request, reply) => {
      let { name, surname, email, username, password } = request.body;
      const salt = await bcrypt.genSalt(10)
      password = await bcrypt.hash(password, salt)

      try {
          let user = new User({name, surname, email, username, password})
          await user.save()
          let token = generateToken(email)
          sendConfirmationMail(email, token)
          reply.status(201).setCookie('token', token, {signed: true, httpOnly: true}).send({message: 'Please confirm your account activation via email.'})
      } catch(e) {
          console.log(e)
          reply.status(400).send({message: 'Email is already taken'})
      }
    })

    fastify.get('/api/users', async (request, reply) => {
        const users = await User.find()
        reply.send(users)
    })

    fastify.delete('/api/users', async (request, reply) => {
        await User.remove()
        reply.send({message: 'Deleted all users.'})
    })
  }
  
  module.exports = routes