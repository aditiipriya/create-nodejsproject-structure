const Promise = require("bluebird");
const RedisSessions = require("redis-sessions");
const config = require("../../../config");

const rsapp = config.cfg.redis.appname;
let rs;

const init = function () {
  rs = new RedisSessions(); //host ,port,namespace are optional
  //   rs = new RedisSessions({ host: "localhost", port: 6379, namespace: "hapi_str" });
  //   rs = new RedisSessions({ host: redis.server, port: redis.port, redisNamespace: redis.redisNamespace });
};

//create token
exports.create = function (value) {
  return new Promise(function (resolve, reject) {
    rs.create(
      {
        app: rsapp,
        id: value.userId,
        ip: value.ip,
        ttl: value.expTime ? value.expTime : 720 * 60 * 60 * 1000,
        d: value.userObj,
        platform: value.userObj.platform,
      },
      function (err, resp) {
        if (err) {
          reject(err);
        }
        if (resp) {
          resolve(resp);
        }
      }
    );
  });
};

//update token data
exports.set = function (token, value) {
  return new Promise(function (resolve, reject) {
    rs.set(
      {
        app: rsapp,
        token: token,
        d: value,
      },
      function (err, resp) {
        if (err) {
          reject(err);
        }
        if (resp) {
          resolve(resp);
        }
      }
    );
  });
};

//get token detail
exports.getByToken = function (token) {
  // console.log("............................token....................", token);
  return new Promise(function (resolve, reject) {
    rs.get(
      {
        app: rsapp,
        token: token,
      },
      function (err, resp) {
        if (err) {
          reject(err);
        }
        if (resp) {
          resolve(resp);
        }
      }
    );
  });
};

//expire or kill token
exports.expire = function (token) {
  return new Promise(function (resolve, reject) {
    rs.kill(
      {
        app: rsapp,
        token: token,
      },
      function (err, resp) {
        if (err) {
          reject(err);
        }
        if (resp) {
          resolve(resp);
        }
      }
    );
  });
};

//get user all session/token detail
exports.getByUserId = function (userId) {
  return new Promise(function (resolve, reject) {
    rs.soid(
      {
        app: rsapp,
        id: userId,
      },
      function (err, resp) {
        if (err) {
          reject(err);
        }
        if (resp) {
          resolve(resp);
        }
      }
    );
  });
};

//Kill all sessions of an id within an app
exports.expireByUserId = function (userId) {
  return new Promise(function (resolve, reject) {
    rs.killsoid(
      {
        app: rsapp,
        id: userId,
      },
      function (err, resp) {
        if (err) {
          console.log(".........err.........", err);
          reject(err);
        }
        if (resp) {
          console.log(".........resp.........", resp);
          resolve(resp);
        }
      }
    );
  });
};

init();
