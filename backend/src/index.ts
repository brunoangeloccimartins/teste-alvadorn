import e, { NextFunction, Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";
import sequelize from "./config/database";
import sportRouter from "./routes/sport";
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', sportRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: error.message });
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error: Error) => {
  console.error('Unable to connect to the database:', error);
});

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((error: Error) => {
  console.log(error);
});