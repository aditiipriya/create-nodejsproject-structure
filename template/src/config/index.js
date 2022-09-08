const dbConfig = require("./dbConfig");
const expressConfig = require("./expressConfig");
const path = require("path");
const extend = require("extend");

let envConfig = {};
let cfg = {};
let environment = process.env.NODE_ENV || "localhost";

// ENV Config
switch (environment) {
  case "local":
  case "localhost":
    envConfig = require("./env/localhost");
    break;
  case "dev":
  case "development":
    envConfig = require("./env/development");
    break;
  case "stag":
  case "staging":
    envConfig = require("./env/staging");
    break;
}

let defaultConfig = {
  projectName: process.env.PROJECT_NAME,
  environment: process.env.NODE_ENV,
  debug: process.env.DEBUG,
  TAG: process.env.NODE_ENV,
  // TAG: "localhost",
  ip: process.env.ip,
  port: process.env.PORT,
  // port: 5001,
  protocol: "http",
  uploadDir: path.resolve("./uploads"),
  tokenExpirationTime: 30 * 24 * 60 * 60 * 1000, // 30 day

  //default admin
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  adminName: process.env.ADMIN_NAME,

  mongo: {
    dbName: process.env.DB_NAME,
    dbUrl: process.env.DB_URL,
    options: {
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true
    },
  },

  sendgridKey: process.env.SENDGRID_KEY,
  sendgridEmail: process.env.SENDGRID_FROM_EMAIL,
  googleAPIKey: "",
  fcmServerKey: "",

  redis: {
    server: process.env.REDIS_SERVER,
    port: process.env.REDIS_PORT,
    namespace: process.env.REDIS_NAMESPACE,
    appname: process.env.REDIS_APP_NAME,
  },

  basicAuth: {
    name: process.env.BASIC_AUTH_USERNAME,
    pass: process.env.BASIC_AUTH_PASS,
  },

  socket: {
    port: process.env.SOCKET_PORT,
  },

  twilio: {
    TWILIO_ACCOUNT_SID: "",
    TWILIO_AUTH_TOKEN: "",
    TWILIO_TWILIO_NUMBER: "",
  },

  iamUser: {
    accessKey: process.env.IAM_ACCESS_KEY,
    keyId: process.env.IAM_KEY_ID,
  },

  s3: {
    maxAsyncS3: 0, // this is the default
    s3RetryCount: 0, // this is the default
    s3RetryDelay: 0, // this is the default
    multipartUploadThreshold: 20975465, // this is the default (20 MB)
    multipartUploadSize: 15728640, // this is the default (15 MB)
    bucketName: process.env.S3_BUCKET_NAME,
    publicBucketName: process.env.S3_BUCKET_NAME,
    signatureVersion: "v2",
    region: process.env.REGION,
    acl: "public-read",
    base_url: "",
  },

  smtp: {
    fromEmail: process.env.FROMEMAIL,
    host: "Gmail",
    auth: {
      user: "",
      pass: "",
    },
    errorLogEmail: "",
  },
};

cfg = extend(defaultConfig, envConfig);

module.exports = {
  cfg,
  dbConfig,
  expressConfig,
};
