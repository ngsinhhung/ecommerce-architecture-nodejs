'use strict'
const swaggerAutogen = require('swagger-autogen')()
const outputFile = './src/swagger-output.json'
const endpointsFiles = [
    './src/routers/index.js',
    './src/routers/product/index.js',
    './src/routers/access/index.js',
    './src/routers/discount/index.js',
    './src/app.js'
]

const doc = {
  info: {
    title: 'Ecommerce Architecture API',
    description: 'Auto-generated Swagger documentation for ecommerce-architecture-nodejs'
  },
  host: 'localhost:3055',
  basePath: '/v1/api',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    { name: 'Access', description: 'Auth & session endpoints' },
    { name: 'Products', description: 'Product endpoints' },
    { name: 'Discounts', description: 'Discount endpoints' }
  ],
  
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger JSON generated at', outputFile)
})