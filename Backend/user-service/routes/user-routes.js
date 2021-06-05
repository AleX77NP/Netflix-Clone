const bcrypt = require('bcrypt')
let User = require('../models/user')
const {generateToken, verifyToken} = require('../utils/auth/jwt')
const sendConfirmationMail = require('../utils/mail/sendEmail')
const send = require('../utils/messaging/send')
const currentDate = require('../utils/date/date')

async function routes (fastify, options) {
    fastify.post('/users/signup', async (request, reply) => {
      let { name, surname, email, password, profiles, plan } = request.body;
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
            let token = generateToken(email)
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

    fastify.post('/users/confirm/email', async(request, reply) => {
        let {token} = request.body;
        const emailUser = verifyToken(token)
        if (emailUser === null) {
            reply.status(401).send({message: 'Unauthorized request.'})
        } else {
            try {
                console.log(emailUser);
                const user = await User.findOneAndUpdate({email: emailUser}, { $set: {confirmed: true}})
                reply.status(200).send({ message: 'Email confirmed.'})
            } catch(e) {
                console.log(e)
                reply.status(500).send({ message: 'Something went wrong, please try again later.'})
            }
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
            reply.status(200).setCookie('token', token, {signed: false, httpOnly: true}).send({message: 'Login success', token})


        } catch(e) {
            reply.status(500).send({ message: 'Something went wrong, please try again later.'})
        }
    })

    fastify.post('/users/logout', async(request, reply) => {
        reply.status(200).clearCookie('token', {path: '/users'}).send({ message : 'Signed out.'})
    })

    fastify.get('/users/me', async(request, reply) => {
        const token = request.cookies['token']
        
        const emailUser = verifyToken(token)
        if (emailUser === null) {
            reply.status(401).send({message: 'Unauthorized request.'})
        } else {
            try {
                const user = await User.findOne({ email: emailUser }, {email:1, name:1, surname:1,liked:1,disliked:1, watchlist:1, profiles:1, confirmed:1})
                reply.status(200).send({user, token})
            } catch(e) {
                console.log(e);
                reply.status(500).send({message: 'Something went wrong, please try again later.'})
            }
        }
    })

    fastify.put('/users/profiles/add', async(request, reply) => {
        const token = request.cookies['token']
        
        const emailUser = verifyToken(token)
        if (emailUser === null) {
            reply.status(401).send({message: 'Unauthorized request.'})
        } else {
            try {
                const user = await User.findOneAndUpdate({email: emailUser}, {$push : {profiles: request.body.profile}})
                reply.status(200).send({ message: 'Profile added'})
            }
            catch(e) {
                console.log(e);
                reply.status(500).send({message: 'Something went wrong, please try again later.'})
            }
        }
    })

    fastify.put('/users/profiles/remove', async(request, reply) => {
        const token = request.cookies['token']
        
        const emailUser = verifyToken(token)
        if (emailUser === null) {
            reply.status(401).send({message: 'Unauthorized request.'})
        } else {
            try {
                const user = await User.findOneAndUpdate({email: emailUser}, {$pull : {profiles: request.body.profile}})
                reply.status(200).send({ message: 'Profile removed'})
            }
            catch(e) {
                console.log(e);
                reply.status(500).send({message: 'Something went wrong, please try again later.'})
            }
        }
    })

    fastify.put('/users/like/add', async(request, reply) => {
        const token = request.cookies['token']
        
        const emailUser = verifyToken(token)
        if (emailUser === null) {
            reply.status(401).send({message: 'Unauthorized request.'})
        } else {
            try {
                const user = await User.findOneAndUpdate({email: emailUser}, {$push : {liked: request.body.id}})
                reply.status(200).send({ message: 'Movie liked'})
            }
            catch(e) {
                console.log(e);
                reply.status(500).send({message: 'Something went wrong, please try again later.'})
            }
        }
    })

    fastify.put('/users/like/remove', async(request, reply) => {
        const token = request.cookies['token']
        
        const emailUser = verifyToken(token)
        if (emailUser === null) {
            reply.status(401).send({message: 'Unauthorized request.'})
        } else {
            try {
                const user = await User.findOneAndUpdate({email: emailUser}, {$pull : {liked: request.body.id}})
                reply.status(200).send({ message: 'Movie like removed'})
            }
            catch(e) {
                console.log(e);
                reply.status(500).send({message: 'Something went wrong, please try again later.'})
            }
        }
    })

    fastify.put('/users/dislike/add', async(request, reply) => {
        const token = request.cookies['token']
        
        const emailUser = verifyToken(token)
        if (emailUser === null) {
            reply.status(401).send({message: 'Unauthorized request.'})
        } else {
            try {
                const user = await User.findOneAndUpdate({email: emailUser}, {$push : {disliked: request.body.id}})
                reply.status(200).send({ message: 'Movie disliked'})
            }
            catch(e) {
                console.log(e);
                reply.status(500).send({message: 'Something went wrong, please try again later.'})
            }
        }
    })

    fastify.put('/users/dislike/remove', async(request, reply) => {
        const token = request.cookies['token']
        
        const emailUser = verifyToken(token)
        if (emailUser === null) {
            reply.status(401).send({message: 'Unauthorized request.'})
        } else {
            try {
                const user = await User.findOneAndUpdate({email: emailUser}, {$pull : {disliked: request.body.id}})
                reply.status(200).send({ message: 'Movie dislike removed'})
            }
            catch(e) {
                console.log(e);
                reply.status(500).send({message: 'Something went wrong, please try again later.'})
            }
        }
    })

    fastify.put('/users/watchlist/add', async(request, reply) => {
        const token = request.cookies['token']
        
        const emailUser = verifyToken(token)
        if (emailUser === null) {
            reply.status(401).send({message: 'Unauthorized request.'})
        } else {
            try {
                const user = await User.findOneAndUpdate({email: emailUser}, {$push : {watchlist: request.body.movie}})
                reply.status(200).send({ message: 'Movie added to watchlist'})
            }
            catch(e) {
                console.log(e);
                reply.status(500).send({message: 'Something went wrong, please try again later.'})
            }
        }
    })

    fastify.put('/users/watchlist/remove', async(request, reply) => {
        const token = request.cookies['token']
        
        const emailUser = verifyToken(token)
        if (emailUser === null) {
            reply.status(401).send({message: 'Unauthorized request.'})
        } else {
            try {
                const user = await User.findOneAndUpdate({email: emailUser}, {$pull : {watchlist: request.body.movie}})
                reply.status(200).send({ message: 'Movie removed from watchlist'})
            }
            catch(e) {
                console.log(e);
                reply.status(500).send({message: 'Something went wrong, please try again later.'})
            }
        }
    })
    
  }
  
  module.exports = routes