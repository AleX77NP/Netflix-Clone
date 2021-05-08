const bcrypt = require('bcrypt')
let User = require('../models/user')
const generateToken = require('../utils/auth/jwt')
const sendConfirmationMail = require('../utils/mail/sendEmail')

async function routes (fastify, options) {
    fastify.post('/api/users/signup', async (request, reply) => {
      let { name, surname, email, username, password, profiles } = request.body;
      try {
        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt)
  
        try {
            let user = new User({name, surname, email, username, password, profiles})
            await user.save()
            let token = generateToken(user.id)
            sendConfirmationMail(email, token)
            reply.status(201).send({message: 'Please confirm your account activation via email.'})
        } catch(e) {
            console.log(e)
            reply.status(400).send({message: 'Email is already taken'})
        }
      }
      catch(e) {
        reply.status(500).send({ message: 'Something went wrong, please try again later.'})
      }
    })

    fastify.post('/api/users/login', async(request, reply) => {
        let {username, password} = request.body;
        try {
            let user = await User.findOne({ $or: [ {email: username}, {username: username }]})
            if (!user) {
                reply.status(404).send({ message: 'User does not exist.'})
            }
            const isCorrect = await bcrypt.compare(password, user.password)
            if (!isCorrect) {
                reply.status(404).send({ message: 'Password is incorrect.'})
            }

            let token = generateToken(user.id)
            reply.status(200).setCookie('token', token, {signed: true, httpOnly: true}).send({message: 'Login success'})


        } catch(e) {
            reply.status(500).send({ message: 'Something went wrong, please try again later.'})
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