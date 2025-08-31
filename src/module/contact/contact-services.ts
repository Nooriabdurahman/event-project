import { Request, Response } from 'express';
import { transporter } from '@/common/config/database/mailer';
import generateCode from '@/common/utils/genrateCode';
import { contactEmailTemplate, verificationCodeTemplate } from '@/templates/emails/verifiction/email';
import contactSchema from './validator/contact.dto';


const codes: Record<string, string> = {};



export const sendemail = async (req: Request, res: Response): Promise<void> => {
  const { name, email, subject, message } = req.body;

  const htmlContent = contactEmailTemplate(name, email, message);

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: subject,
    html: htmlContent
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      status: 'success',
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to send email'
    });
  }
};

export const sendcode = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  const code = generateCode();
  codes[email] = code;

  const htmlContent = verificationCodeTemplate(code);

  try {
    await transporter.sendMail({
      from: `"Verification" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Verification Code',
      html: htmlContent
    });

    res.json({ success: true, message: 'Code sent to your email!' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.json({ success: false, message: 'Error sending email!' });
  }
};

export const verfycode = async (req: Request, res: Response): Promise<void> => {
  const { email, code } = req.body;
  if (codes[email] && codes[email] === code.toUpperCase()) {
    res.json({ success: true, message: '✅ Code is correct!' });
    delete codes[email];
  } else {
    res.json({ success: false, message: '❌ Code is incorrect.' });
  }
};

export const validateContact = (req: Request, res: Response, next: Function): void => {
  const { error } = contactSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    
    res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors
    });
    return;
  }
  
  next();
};
