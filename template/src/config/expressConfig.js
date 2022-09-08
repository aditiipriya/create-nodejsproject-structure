const bodyParser = require("body-parser"); // parses information from POST
const methodOverride = require("method-override"); // used to manipulate POST

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../swagger.json");

module.exports = function (app, env) {
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb' , extended: true }));
  app.use(
    methodOverride(function (request, response) {
      if (
        request.body &&
        typeof request.body === "object" &&
        "_method" in request.body
      ) {
        const method = request.body._method;
        delete request.body._method;
        return method;
      }
    })
  );
  //swagger
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Credentials", true);
    response.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, authorization, accessToken"
    );
    response.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    next();
  });
};
