// const nodemailer = require('nodemailer');

// const sendMail = (to, subject, text) => {
//     let transport = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true,
//         auth: {
//             user: process.env.EMAIL_USERNAME,
//             pass: process.env.EMAIL_PASSWORD
//         }
//     });
//     const mailOptions = {
//         from: process.env.EMAIL_USERNAME, // Sender address
//         to, // List of recipients
//         subject, // Subject line
//         text, // Plain text body
//     };

//     transport.sendMail(mailOptions, function (err, info) {
//         if (err) {
//             throw err;
//         }
//     });
// }

// module.exports = { sendMail }
