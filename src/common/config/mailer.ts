import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'nooriabdurahman084@gmail.com',
    pass: process.env.EMAIL_PASS || 'tokm ynjr lpzq brqq'
  }
});

export { transporter };