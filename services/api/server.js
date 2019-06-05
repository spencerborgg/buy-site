import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import { NotFoundError } from "./utils/errors";
import router from "./router";
import expressJwt from "express-jwt";

require('dotenv').config()

const app = express();

const unsecuredRoutes = ["/api/auth/login", "/api/daily/message"];
const jwtConfig = {
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use((req, res, next) => {
  res.header("Content-Type", "application/vnd.api+json");
  next();
});

app.set("trust proxy", true);

app.use(compression());

app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressJwt(jwtConfig).unless({ path: unsecuredRoutes }))

router.setup(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  return next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.msg;
  res.locals.error = err;
  res.status(err.status);
  return res.send(err);
});

app.listen(process.env.port, () => {
  console.log(
    "[%s] Listening on http://localhost:%d",
    process.env.NODE_ENV,
    process.env.port
  );
});

module.exports = app;
