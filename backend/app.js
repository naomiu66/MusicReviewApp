const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const connectDb = require("./configs/mongodb");
const session = require("express-session");
const { RedisStore } = require("connect-redis");
const redis = require("redis");

require("dotenv").config();
const SESSION_SECRET = process.env.SESSION_SECRET;
const REDIS_URL = process.env.REDIS_URL;

connectDb();

const redisClient = redis.createClient({
  url: REDIS_URL,
});

redisClient.connect().catch(console.error);

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "*",
    credentials: true,
  }),
);
app.use(
  session({
    name: "sid",
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    },
  }),
);

app.use("/api/auth", authRoutes);

module.exports = app;
