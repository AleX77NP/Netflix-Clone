// Require fastify
const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')
var ip = require('ip');

const PORT = 9003;

const Eureka = require('eureka-js-client').Eureka;

const eureka = new Eureka({
  instance: {
    app: 'USER-SERVICE',
    instanceId: 'USER-SERVICE',
    hostName: 'eureka-spring',
    ipAddr: ip.address(),
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
    host: 'eureka-spring',
    port: 8761,
    servicePath: '/eureka/apps/'
  }
});
eureka.logger.level('debug');
eureka.start(function(error){
  console.log(error || 'complete');
});


require('dotenv').config()

fastify.register(require("fastify-cors"), {
  origin: "http://localhost:3000",
  methods: ["POST", "GET", "DELETE", "PUT", "OPTIONS"],
  credentials: true
});

fastify.register(require('fastify-cookie'), {
  secret: process.env.COOKIE_SECRET, // for cookies signature
  parseOptions: {}     // options for parsing cookies
})

mongoose.connect('mongodb://mongo/netflix', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(() => {
  console.log('DB Connection...')
}).catch((err) => {
  console.log(err)
}) 

/*mongoose.connect('mongodb://localhost:27017/netflix', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(() => {
  console.log('DB Connection...')
}).catch((err) => {
  console.log(err)
}) */

fastify.get('/', async (request, reply) => {
  return { user: 'service' }
})

fastify.register(require('./routes/user-routes'))


// Run the server
fastify.listen(PORT, '0.0.0.0', function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})