import express from 'express';
import dotenv from 'dotenv';
import router from './controller/routes.js'
import cors from 'cors'
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swagger from './startup/swagger.js'
dotenv.config();

const app = express();
const port = process.env.PORT | 3001;

app.use(cors());
app.use(express.json())
app.use(router)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swagger.options)));


app.listen(port, () =>
  console.log(`Listening on port ${port}, running on ${process.env.ENVIRONMENT}...`)
);