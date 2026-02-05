const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const connectDb = require("./configs/mongodb");
const redis = require("./configs/redis");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require("dotenv").config();

const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MusicReviewApi",
      version: "1.0.0"
    }
  },
  apis: ["./routes/*.js"],
})

connectDb();

redis.connectRedis();

const authRoutes = require("./routes/authRoutes");
const musicRoutes = require("./routes/musicRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:8081",
    methods: "*",
    credentials: true,
  }),
);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
