const bcrypt = require('bcrypt')
let User = require('../models/user')
const {generateToken, verifyToken} = require('../utils/auth/jwt')
const sendConfirmationMail = require('../utils/mail/sendEmail')
const send = require('../utils/messaging/send')
const currentDate = require('../utils/date/date')

async function routes (fastify, options) {
    fastify.post('/users/signup', async (request, reply) => {
      let { name, surname, email,password, profiles, plan } = request.body;
      try {
        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt)
  
        try {
            let user = new User({name, surname, email, password, profiles})
            await user.save()
            let paymentInfo = {
                'user': email,
                'plan': plan,
                'last_modified': currentDate()
            };
            send(paymentInfo)
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

    fastify.post('/users/login', async(request, reply) => {
        let {email, password} = request.body;
        try {
            let user = await User.findOne({ email })
            if (!user) {
                reply.status(404).send({ message: 'User does not exist.'})
            }
            const isCorrect = await bcrypt.compare(password, user.password)
            if (!isCorrect) {
                reply.status(404).send({ message: 'Password is incorrect.'})
            }

            let token = generateToken(user.email)
            reply.status(200).setCookie('token', token, {signed: false, httpOnly: true}).send({message: 'Login success'})


        } catch(e) {
            reply.status(500).send({ message: 'Something went wrong, please try again later.'})
        }
    })

    fastify.get('/users/me', async(request, reply) => {
        const token = request.cookies['token']
        
        const emailUser = verifyToken(token)
        if (emailUser === null) {
            reply.status(401).send({message: 'Unauthorized request.'})
        } else {
            try {
                const user = await User.findOne({ email: emailUser }, {email:1, name:1, surname:1,liked:1,disliked:1, watchlist:1, profiles:1, confirmed:1})
                reply.status(200).send({user})
            } catch(e) {
                console.log(e);
                reply.status(500).send({message: 'Something went wrong, please try again later.'})
            }
        }
    })

    fastify.get('/users', async (request, reply) => {
        const users = await User.find()
        reply.send(users)
    })

    fastify.delete('/users', async (request, reply) => {
        await User.remove()
        reply.send({message: 'Deleted all users.'})
    })
  }
  
  module.exports = routes