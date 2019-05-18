const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');


let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: false,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }
});

const generateHTML = (view, options = {}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${view}.pug`, options);
    return juice(html);
};

exports.send = (options) => {
    try {
        const html = generateHTML(options.view, options);
        let mailOptions = {
            from: 'UpTask <no-reply@utask.com',
            to: options.email,
            subject: options.subject,
            text: htmlToText.fromString(html),
            html: html
        }
        transport.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
    
}