const nodemailer = require('nodemailer');

const sendMail = async (to, subject, text) => {
    let transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.EMAIL_USERNAME, // Sender address
        to, // List of recipients
        subject, // Subject line
        text, // Plain text body
    };
    let isSent;
    await transport.sendMail(mailOptions)
    .then(()=>{
        console.log("sent");
        isSent = true;
    })
    .catch((err)=>{
        console.log(err);
        isSent = false;
    });
    return isSent;
}

module.exports = { sendMail }
