// Require fastify
const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')

require('dotenv').config()

fastify.register(require('fastify-cookie'), {
  secret: process.env.COOKIE_SECRET, // for cookies signature
  parseOptions: {}     // options for parsing cookies
})

mongoose.connect('mongodb://localhost/netflix', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(() => {
  console.log('DB Connection...')
}).catch((err) => {
  console.log(err)
})

fastify.get('/', async (request, reply) => {
  return { user: 'service' }
})

fastify.register(require('./routes/user-routes'))


// Run the server
const start = async () => {
  try {
    await fastify.listen(9000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()