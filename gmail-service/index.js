const express = require('express');
const routes=require('../routes');
const app = express()
const port = process.env.PORT || 4000;
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gmail-Smart-API-Service",
      version: "1.0.0",
      description:
        "This is a simple Web API that provides utility functions to gmail users for cleanup and maintanence",
      contact: {
        name: "Vasanth Bharathi Venkata Subramanian",
        url: "https://logrocket.com",
        email: "ivasanthbharathi07@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ['../routes.js'],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

//app.use('/api',routes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
