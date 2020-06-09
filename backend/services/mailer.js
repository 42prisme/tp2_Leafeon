require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports = class mailer{
    constructor() {
        //console.log("email:",process.env.EMAIL)
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        this.mailOptions = {
            from: 'noreplytp2Leafeon@gmail.com',
            to: '',
            subject:'account validation',
            text:'test'
        }
    }

    send_email(email, token)
    {
        const url= 'http://localhost:3333/user/conf/' +token ;
        this.mailOptions.to = email
        this.mailOptions.text = url;
        this.transporter.sendMail(this.mailOptions, function (err, data){
            if (err) {
                console.log('ERROR OCCURS',err)
            } else {
                console.log('EMAIL SENT!!')
            }
        })
    }
}