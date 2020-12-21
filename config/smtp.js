const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "user", // user del correo
      pass: "pass", // password del correo -> si es Gmail, usar una contraseña de aplicacion
    },
  });

module.exports = transporter
