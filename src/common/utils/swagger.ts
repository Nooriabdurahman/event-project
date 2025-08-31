import swaggerJsDoc from 'swagger-jsdoc';
import path, { join } from 'path';


const routesPathTs = join(__dirname, '../../module/**/*.ts');
const routesPathJs = join(__dirname, '../../module/**/*.js');

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Login-Signup API',
      version: '1.0.0',
      description: 'API documentation for login, signup, and events',
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: [routesPathTs, routesPathJs],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
