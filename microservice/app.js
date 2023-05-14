import express from 'express';
import dotenv from 'dotenv';
import router from './controller/routes.js'
import cors from 'cors'
dotenv.config();

const app = express();
const port = process.env.PORT | 3001;

app.use(cors());
app.use(express.json())
app.use(router)

app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);