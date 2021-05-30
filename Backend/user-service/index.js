// Require fastify
const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')

const Eureka = require('eureka-js-client').Eureka;

const eureka = new Eureka({
  instance: {
    app: 'USER-SERVICE',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: 'http://localhost:9003',
    port: {
      '$': 9003,
      '@enabled': 'true',
    },
    vipAddress: 'user-service',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    }
  },
  eureka: {
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/'
  }
});
eureka.logger.level('debug');
eureka.start(function(error){
  console.log(error || 'complete');
});


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
    await fastify.listen(9003)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()