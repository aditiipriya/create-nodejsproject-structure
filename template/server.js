require("dotenv").config({ debug: process.env.DEBUG });
console.log("Server Start Date : ", new Date());
const express = require("express");
const cors = require("cors");
const path = require("path");
const responseTime = require("response-time");

const config = require("./src/config");
const app = express();
const logger = require("./src/logger/index");

config.dbConfig(config.cfg, (error) => {
  if (error) {
    logger.error(error, "Exiting the app.");
  }

  app.use(cors());
  app.use(responseTime());
  // app.use(express.limit('2mb'));

  // set the view engine to ejs
  app.set("templates", path.join(__dirname, "templates"));
  app.set("view engine", "ejs");

  // set server home directory
  app.locals.rootDir = __dirname;
  // config express
  config.expressConfig(app, config.cfg.environment);
  console.log("env : ", config.cfg.environment);
  
  // attach the routes to the app
  require("./src/api/v1/route")(app);

  // start server
  app.listen(config.cfg.port, () => {
    logger.info(
      `Express server listening on ${config.cfg.ip}:${config.cfg.port}, in ${config.cfg.TAG} mode`
    );
  });
});
