import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
dotenv.config();

const doc = {
  info: {
    title: 'Automatic Processing of LC',
    description: 'Automatically generated Swagger documentation',
  },
  schemes: ['http'],
  tags: [
    {
      name: 'Customers',
      description: 'Endpoints related to customers'
    }
  ]
};

const outputFile = './src/swagger/swagger.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation has been generated!');
});
