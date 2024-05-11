import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport from "./services/passport.js"
import session from 'express-session'

//routes
import authRoutes from "./routes/auth.js";


import "dotenv/config";
import cors from "cors";


const app = express();
const port = process.env.PORT;

const connect = () => {
  mongoose
    .connect(process.env.MONGO_DATABASE)
    .then(() => console.log("connected to db"))
    .then(() => {
      app.use(express.json());
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use(express.json());

app.use(session({
  secret: "process.env.SECRET",
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", authRoutes);

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";
  console.log(err);
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(port, () => {
  connect();
  console.log(`app is listening on ${port} `);
});

