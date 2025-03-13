

import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: 'Express API',
    description: 'Automatically generated Swagger documentation',
  },
  host: 'localhost:3000', // Change this to your server's host and port
  schemes: ['http'],
  tags: [  // ✅ Define API headers (sections)
    {
      name: 'Customers', 
      description: 'Endpoints related to users'
    },
    {
      name: 'Orders',
      description: 'Endpoints related to orders'
    }
  ]
};

const outputFile = './src/swagger/swagger.json';
const endpointsFiles = ['./app.js']; // Replace with your main application file or route files

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  console.log('Swagger documentation has been generated!');
});
