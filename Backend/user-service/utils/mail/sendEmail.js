const nodemailer = require("nodemailer");

const CLIENT_URL = 'http://localhost:3000'

function sendConfirmationMail(email, token) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass : process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Account confirmation - Netflix Clone',
        text: 'Verify account',
        html: `
            <a href='${CLIENT_URL}/confirm/${token}'>Click here to confirm email</a>
            <br />
            <p>Follow the link to activate your account.</p>
        `
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
            console.log(error)
        } else {
            console.log('email sent' + info.response);
        }
    })
}

module.exports = sendConfirmationMail;