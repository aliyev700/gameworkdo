const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
 
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      // .env faylındakı adları bura yazdıq:
      user: process.env.SMTP_EMAIL, 
      pass: process.env.SMTP_PASSWORD, 
    },
  });

  const message = {
    from: `GameWorkDo Support <${process.env.SMTP_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;