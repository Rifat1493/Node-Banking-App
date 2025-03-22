import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
dotenv.config();

const doc = {
  info: {
    title: 'Automatic Processing of LC',
    description: 'Automatically generated Swagger documentation',
  },
  host: `${process.env.EC2_PUBLIC_IP || 'localhost'}:3000`, // Default to 'localhost:3000' if EC2_PUBLIC_IP is not set
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

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation has been generated!');
});