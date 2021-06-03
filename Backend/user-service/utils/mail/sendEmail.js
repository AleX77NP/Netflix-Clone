const nodemailer = require("nodemailer");

const CLIENT_URL = 'http://localhost:3000'

function sendConfirmationMail(email, token) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'milanovicaleX77@gmail.com',
            pass : 'acoaco12' //password here
        }
    });

    let mailOptions = {
        from: 'milanovicaleX77@gmail.com',
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