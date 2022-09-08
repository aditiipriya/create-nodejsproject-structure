const config = require("../../../config");
const Promise = require("bluebird");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(config.cfg.sendgridKey);

function _templateRead(template, params) {
  let filename = "./src/api/v1/templates/" + template + ".ejs";
  return new Promise(function (resolve, reject) {
    ejs.renderFile(filename, params, function (error, htmlData) {
      if (error) {
        reject(error);
      }
      resolve(htmlData);
    });
  });
}

function _sendForgetEmailUser(payload) {
  let token = payload.token;
  let link = process.env.HOMEPATH + "/api-docs#/User/post_user_resetPassword/" + token;
  let logo = config.cfg.forgotEmailImage

  return _templateRead(payload.template, {
    logo: logo,
    userName: payload.email,
    link,
  }).then(async function (htmlContent) {
    const msg = {
      to: payload.email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: payload.subject,
      html: htmlContent,
    };
    await sgMail.send(msg);
  });
}

function _sendForgetEmailAdmin(payload) {
  let token = payload.token;
  let link = process.env.HOMEPATH + "/documentation#/admin/postAdminChangepassword/" + token;
  //link="http://ip address/api/v1/admin/resetPasword"
  console.log(
    link,
    "..............ResetPasswordLink.................................................."
  );
  let logo = config.cfg.forgotEmailImage

  return _templateRead(payload.template, {
    logo: logo,
    userName: payload.email,
    link,
  }).then(function (htmlContent) {
    const msg = {
      to: payload.email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: payload.subject,
      html: htmlContent,
    };
    sgMail.send(msg);
  });
}

function _sendEmailNodemailer(payload) {
  const fromEmail = config.cfg.smtp.fromEmail;
  const toEmail = payload.to;
  const subject = payload.subject;
  const content = _templateRead(payload.template, payload);

  let smtpTransport = nodemailer.createTransport({
    host: config.cfg.smtp.host,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.cfg.smtp.auth.user,
      pass: config.cfg.smtp.auth.pass,
    },
  });
  // setup email data with unicode symbols
  let mailOptions = {
    from: fromEmail, // sender address.  Must be the same as authenticated user if using Gmail.
    to: toEmail, // receiver
    subject: subject, // subject
    html: content, // html body
  };
  return new Promise(function (resolve, reject) {
    smtpTransport.sendMail({ mailOptions }, function (err, data) {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

module.exports = {
  sendForgetEmailAdmin: _sendForgetEmailAdmin,
  sendForgetEmailUser: _sendForgetEmailUser,
  sendEmailNodemailer: _sendEmailNodemailer,
};
