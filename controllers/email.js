const templates = require("./emailTemplate");
const nodemailer = require("nodemailer");
const sender_email = process.env.Gmail_User
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //SMTP Host
    port: 465, //SMTP Port
    secure: true,
    auth: {
        user: sender_email, // generated ethereal user
        pass: process.env.Gmail_Pass, // generated ethereal password
    },
    from: sender_email
});

module.exports = {

    sendVerifyMail: async (email, name, link) => {
        let temp = templates.verifyEmail(name, link);
        try {

            let info = await transporter.sendMail({
                from: sender_email, // sender address
                to: email, // list of receivers
                subject: "Verify your Email address", // Subject line
                text: "Verify your Email address", // plain text body
                html: temp, // html body
            });
            console.log(info);
            console.log("Message sent: %s", info.messageId);
        } catch (error) {
            console.log(error);
        }
    }
    ,

    sendResetMail: async (email, name, link) => {
        try {
            let temp = templates.resetPassTemplate(name, link);
            let info = await transporter.sendMail({
                from: sender_email, // sender address
                to: email, // list of receivers
                subject: "Reset your Password", // Subject line
                text: "Reset your Password", // plain text body
                html: temp, // html body
            });

            console.log("Message sent: %s", info.messageId);
        }

        catch (error) {
            console.log(error);
        }
    },
}