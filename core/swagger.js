

import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: 'Express API',
    description: 'Automatically generated Swagger documentation',
  },
  host: 'localhost:3000', // Change this to your server's host and port
  schemes: ['http'],
};

const outputFile = './src/swagger/swagger.json';
const endpointsFiles = ['./app.js']; // Replace with your main application file or route files

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  console.log('Swagger documentation has been generated!');
});
